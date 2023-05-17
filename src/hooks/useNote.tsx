import {
  ClipboardIcon,
  EllipsisHorizontalCircleIcon,
  EyeIcon,
  EyeSlashIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { TwitterIcon } from "src/components/icon/TwitterIcon";
import type { NoteMenuProps } from "src/components/NoteMenu";
import { Button } from "src/components/shared/Button";
import type { NotePutRequest, NoteType } from "src/types/types";

const useNoteMenu = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);
  const handleOpenMenu = useCallback(() => {
    setIsShowMenu(true);
  }, []);
  const handleCloseMenu = useCallback(() => {
    setIsShowMenu(false);
  }, []);
  return { isShowMenu, handleOpenMenu, handleCloseMenu };
};

const useDeleteNoteDialog = (note: NoteType) => {
  const router = useRouter();
  const [isShowDeleteNoteDialog, setIsShowDeleteNoteDialog] = useState(false);
  const handleOpenDeleteNoteDialog = useCallback(() => {
    setIsShowDeleteNoteDialog(true);
  }, []);
  const handleCloseDeleteNoteDialog = useCallback(() => {
    setIsShowDeleteNoteDialog(false);
  }, []);
  const handleDeleteMemo = useCallback(async () => {
    await fetch(`/notes/${note.id}`, { method: "delete" });
    await router.push("/");
    toast.success("削除しました");
  }, [note.id, router]);
  return { isShowDeleteNoteDialog, handleOpenDeleteNoteDialog, handleCloseDeleteNoteDialog, handleDeleteMemo };
};

const sleep = (msec: number) => {
  return new Promise((resolve) => {
    return setTimeout(resolve, msec);
  });
};

export const useNote = (note: NoteType) => {
  const { isShowMenu, handleOpenMenu, handleCloseMenu } = useNoteMenu();
  const { isShowDeleteNoteDialog, handleOpenDeleteNoteDialog, handleCloseDeleteNoteDialog, handleDeleteMemo } =
    useDeleteNoteDialog(note);
  const [isPublic, setIsPublic] = useState(note.public);

  const handleTogglePublicState = useCallback(async () => {
    const req: NotePutRequest = { id: note.id, public: !isPublic };
    await fetch(`/notes/${note.id}/public`, { method: "patch", body: JSON.stringify(req) });
    handleCloseMenu();
    await sleep(200);
    setIsPublic(!isPublic);
  }, [handleCloseMenu, isPublic, note.id]);

  // ヘッダーの右メニュー部分
  const headerRight = useMemo(() => {
    if (isPublic) {
      return [
        <span key="public" className="rounded-full bg-orange-400 py-1 px-2.5 text-xs font-bold text-white">
          公開中
        </span>,
        <Button key="menu" variant="ghost" className="h-10 w-10" onClick={handleOpenMenu}>
          <EllipsisHorizontalCircleIcon className="h-5 w-5" />
        </Button>,
      ];
    }
    return [
      <Button key="menu" variant="ghost" className="h-10 w-10" onClick={handleOpenMenu}>
        <EllipsisHorizontalCircleIcon className="h-5 w-5" />
      </Button>,
    ];
  }, [handleOpenMenu, isPublic]);

  // ダイアログ内のメニュー部分
  const menu = useMemo<NoteMenuProps["menu"]>(() => {
    return [
      [
        {
          label: isPublic ? "非公開にする" : "公開する",
          labelColor: "blue",
          icon: isPublic ? <EyeSlashIcon /> : <EyeIcon />,
          iconColor: "blue",
          onClick: () => {
            handleTogglePublicState();
            if (isPublic) {
              toast("非公開にしました");
            } else {
              toast.success("公開しました");
            }
          },
        },
        {
          label: "削除する",
          labelColor: "red",
          icon: <TrashIcon />,
          iconColor: "red",
          onClick: () => {
            handleOpenDeleteNoteDialog();
            handleCloseMenu();
          },
        },
      ],
      isPublic ? undefined : "以下は公開後に操作ができます",
      [
        {
          label: "Twitterでシェアする",
          icon: <TwitterIcon />,
          iconColor: "twitter",
          onClick: () => {
            // TODO
            const url = `https://twitter.com/intent/tweet?url=${
              location.href
            }&text=${"メモを書きました"}&via=${"Memo"}`;
            window.open(url, "_blank", "noreferrer");
          },
          disabled: !isPublic,
        },
        {
          label: "リンクをコピーする",
          icon: <ClipboardIcon />,
          onClick: async () => {
            await navigator.clipboard.writeText(location.href);
            toast("コピーしました");
            handleCloseMenu();
          },
          disabled: !isPublic,
        },
      ],
    ];
  }, [handleCloseMenu, handleOpenDeleteNoteDialog, handleTogglePublicState, isPublic]);

  return {
    headerRight,
    menu,
    // menu
    isShowMenu,
    handleCloseMenu,
    // delete dialog
    handleDeleteMemo,
    isShowDeleteNoteDialog,
    handleCloseDeleteNoteDialog,
  };
};