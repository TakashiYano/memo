import { useState } from "react";
import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useForm, type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import {
  signinFormSchema,
  signupFormSchema,
  type SigninFormSchemaType,
  type SignupFormSchemaType,
} from "@/lib/form/SignForm";

export const useSigninForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SigninFormSchemaType>({
    resolver: zodResolver(signinFormSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SigninFormSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      const parsed = signinFormSchema.parse(data);
      await toast.promise(
        supabase.auth.signInWithPassword({
          email: parsed.email,
          password: parsed.password,
        }),
        {
          error: "ログインに失敗しました",
          loading: "ログインしています",
          success: "ログインに成功しました",
        }
      );
      router.push("/");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return {
    errors,
    isLoading,
    onSubmit: handleSubmit(onSubmit),
    register,
  };
};

export const useSignupForm = () => {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const [isLoading, setIsLoading] = useState(false);

  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SignupFormSchemaType> = async (data) => {
    try {
      setIsLoading(true);
      const parsed = signupFormSchema.parse(data);
      await toast.promise(
        supabase.auth.signUp({
          email: parsed.email,
          options: {
            emailRedirectTo: "http://localhost:3000/auth/callback",
          },
          password: parsed.password,
        }),
        {
          error: "新規登録に失敗しました",
          loading: "新規登録しています",
          success: "新規登録に成功しました",
        }
      );
      router.push("/");
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  return {
    errors,
    isLoading,
    onSubmit: handleSubmit(onSubmit),
    register,
  };
};
