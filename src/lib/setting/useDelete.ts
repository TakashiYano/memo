"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { type ProfileAllType } from "@/lib/profile/type";
import { createClient } from "@/lib/supabase/browser";

export const useDeleteDialog = (props: ProfileAllType) => {
  const { profile } = props;
  const supabase = createClient();
  const router = useRouter();

  // account
  const [isShowDeleteAccount, setIsShowDeleteAccount] = useState(false);
  const handleOpenDeleteAccountDialog = useCallback(() => {
    setIsShowDeleteAccount(true);
  }, []);
  const handleCloseDeleteAccountDialog = useCallback(() => {
    setIsShowDeleteAccount(false);
  }, []);
  const handleDeleteAccount = useCallback(async () => {
    if (!profile) {
      return;
    }
    await supabase.from("profiles").delete().eq("id", profile.id);
    await supabase.auth.signOut();
    router.refresh();
  }, [profile, supabase, router]);

  return {
    handleCloseDeleteAccountDialog,
    handleDeleteAccount,
    handleOpenDeleteAccountDialog,
    isShowDeleteAccount,
  };
};
