import { useCallback, useState } from "react";

import { type ProfileAllType } from "@/lib/profile/type";

export const useDeleteDialog = (props: ProfileAllType) => {
  const { profile } = props;

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
    // TODO:ユーザーデータの削除
    alert("未実装");
  }, [profile]);

  return {
    handleCloseDeleteAccountDialog,
    handleDeleteAccount,
    handleOpenDeleteAccountDialog,
    isShowDeleteAccount,
  };
};
