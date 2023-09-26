import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import {
  signinFormSchema,
  signupFormSchema,
  type SigninFormSchemaType,
  type SignupFormSchemaType,
} from "@/lib/form/SignForm";

export const useSigninForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SigninFormSchemaType>({
    resolver: zodResolver(signinFormSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SigninFormSchemaType> = (data) => {
    try {
      console.log(data);
      // TODO：ログイン処理
    } catch (error) {
      console.error(error);
      alert("ログインに失敗しました");
    }
  };

  return {
    errors,
    onSubmit: handleSubmit(onSubmit),
    register,
  };
};

export const useSignupForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SignupFormSchemaType> = (data) => {
    try {
      console.log(data);
      // TODO：ログイン処理
    } catch (error) {
      console.error(error);
      alert("ログインに失敗しました");
    }
  };

  return {
    errors,
    onSubmit: handleSubmit(onSubmit),
    register,
  };
};
