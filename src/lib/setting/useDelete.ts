"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { type ProfileAllType } from "@/lib/profile/type";
import { createClient } from "@/lib/supabase/browser";

export const useDeleteDialog = (props: ProfileAllType) => {
  const { profile } = props;
  const supabase = createClient();
  const router = useRouter();

  // memo
  const [isShowDeleteMemo, setIsShowDeleteMemo] = useState(false);
  const handleOpenDeleteMemoDialog = useCallback(() => {
    setIsShowDeleteMemo(true);
  }, []);
  const handleCloseDeleteMemoDialog = useCallback(() => {
    setIsShowDeleteMemo(false);
  }, []);
  const handleDeleteMemo = useCallback(async () => {
    if (!profile) {
      return;
    }
    await supabase.from("memo_notes").delete().eq("user_id", profile.id);
    await supabase.auth.signOut();
    router.refresh();
  }, [profile, supabase, router]);

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
    handleCloseDeleteMemoDialog,
    handleDeleteAccount,
    handleDeleteMemo,
    handleOpenDeleteAccountDialog,
    handleOpenDeleteMemoDialog,
    isShowDeleteAccount,
    isShowDeleteMemo,
  };
};
