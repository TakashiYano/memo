"use client";

import { type FC } from "react";

import { tv } from "tailwind-variants";

import { InputConfirmDialog } from "@/app/setting/_component/Account/InputConfirmDialog";
import { Button } from "@/component/Button";
import { List } from "@/component/List/List";
import { type ProfileAllType } from "@/lib/profile/type";
import { useDeleteDialog } from "@/lib/setting/useDelete";

const list = tv({
  slots: {
    container: "space-y-4 border-b border-indigo-6 dark:border-indigodark-6",
  },
});

export const DeleteAccount: FC<ProfileAllType> = (props) => {
  const { profile } = props;
  const { container } = list();
  const {
    handleCloseDeleteAccountDialog,
    handleCloseDeleteMemoDialog,
    handleDeleteAccount,
    handleDeleteMemo,
    handleOpenDeleteAccountDialog,
    handleOpenDeleteMemoDialog,
    isShowDeleteAccount,
    isShowDeleteMemo,
  } = useDeleteDialog({ profile });

  return (
    <div className={container()}>
      <h1 className="text-xl font-bold text-indigo-11 dark:text-indigodark-11">サービス削除</h1>

      <List
        items={[
          {
            button: (
              <Button
                variant="error"
                className="px-4 py-2 text-sm text-red-11 dark:text-reddark-11"
                onClick={handleOpenDeleteMemoDialog}
              >
                削除する
              </Button>
            ),
            label: <div className="ml-3 flex-1 font-bold">Memoデータの削除</div>,
          },
          {
            button: (
              <Button
                variant="error"
                className="px-4 py-2 text-sm text-red-11 dark:text-reddark-11"
                onClick={handleOpenDeleteAccountDialog}
              >
                削除する
              </Button>
            ),
            label: <div className="ml-3 flex-1 font-bold">アカウントの削除</div>,
          },
        ]}
      />

      <InputConfirmDialog
        show={isShowDeleteMemo}
        onClose={handleCloseDeleteMemoDialog}
        onClickOk={handleDeleteMemo}
        title="Memoデータの削除"
        buttonText="削除する"
      />

      <InputConfirmDialog
        show={isShowDeleteAccount}
        onClose={handleCloseDeleteAccountDialog}
        onClickOk={handleDeleteAccount}
        title="アカウントの削除"
        buttonText="削除する"
      />
    </div>
  );
};
