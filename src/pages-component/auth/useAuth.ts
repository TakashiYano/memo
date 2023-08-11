import type { Session } from "@supabase/supabase-js";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import type { UserType } from "src/api/handler/user/type";
import { supabase } from "src/lib/supabase";

/** @package */
export const useAuth = () => {
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null); // ログイン状態を管理
  const [error, setError] = useState(""); // エラー状況を管理

  useEffect(() => {
    // ログイン状態の変化を監視
    const { data: authData } = supabase.auth.onAuthStateChange((_, session) => {
      setSession(session);
    });

    // リスナーの解除
    return () => {
      return authData.subscription.unsubscribe();
    };
  }, []);

  // Googleでサインイン
  const handleSignInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({ provider: "google" });
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

  // ログインユーザーのプロフィール取得: Google
  const profileFromGoogle: UserType = {
    id: session?.user?.user_metadata.provider_id,
    name: session?.user?.user_metadata.name,
    avatarUrl: session?.user?.user_metadata.avatar_url,
  };

  // サインアウト
  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/signin");
  };

  return {
    session,
    error,
    profileFromGoogle,
    handleSignInWithGoogle,
    handleSignOut,
  };
};
