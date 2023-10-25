"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import { type SubmitHandler } from "react-hook-form";
import { toast } from "react-hot-toast";

import { createClient } from "@/lib/supabase/browser";
import {
  signinFormSchema,
  signupFormSchema,
  type SigninFormSchemaType,
  type SignupFormSchemaType,
} from "@/lib/user/type";

export const useAuth = () => {
  const supabase = createClient();
  const router = useRouter();
  const [isCreatingUser, startTransition] = useTransition();

  // Google Signin
  const handleGoogleSignin = async () => {
    try {
      await supabase.auth.signInWithOAuth({
        options: {
          redirectTo: "https://memo-note.vercel.app/auth/callback",
        },
        provider: "google",
      });
    } catch (error) {
      toast.error("Googleとの連携に失敗しました。");
    }
  };

  // Email Signup
  const handleEmailSignup: SubmitHandler<SignupFormSchemaType> = async (data) => {
    try {
      const parsed = signupFormSchema.parse(data);
      await toast.promise(
        supabase.auth.signUp({
          email: parsed.email,
          options: {
            emailRedirectTo: "https://memo-note.vercel.app/auth/callback",
          },
          password: parsed.password,
        }),
        {
          error: "新規登録に失敗しました",
          loading: "新規登録しています",
          success: "新規登録に成功しました",
        }
      );
      await router.push("/");
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  };

  // Email SignIn
  const handleEmailSignin: SubmitHandler<SigninFormSchemaType> = async (data) => {
    try {
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
      await router.push("/");
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error(error);
    }
  };

  // SignOut
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    await router.push("/signin");
    startTransition(() => {
      router.refresh();
    });
  };

  return {
    handleEmailSignin,
    handleEmailSignup,
    handleGoogleSignin,
    handleSignOut,
    isCreatingUser,
  };
};
