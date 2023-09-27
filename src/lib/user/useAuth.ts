"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export const useAuth = () => {
  const [error, setError] = useState("");
  const supabase = createClientComponentClient();
  const router = useRouter();

  // サインイン処理
  const handleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        options: {
          redirectTo: "http://localhost:3000/auth/callback",
        },
        provider: "google",
      });
      if (error) {
        setError(error.message);
      }
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else if (typeof error === "string") {
        setError(error);
      } else {
        console.error("Googleとの連携に失敗しました。");
      }
    }
  };
  // サインアウト処理
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.refresh();
  };

  return {
    error,
    handleSignIn,
    handleSignOut,
  };
};
