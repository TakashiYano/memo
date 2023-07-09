import { ChevronLeftIcon, ClipboardIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ChangeEvent } from "react";
import { useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import TextareaAutosize from "react-textarea-autosize";
import { ConfirmDialog } from "src/components/Dialog";
import { Anchor, Button } from "src/components/shared/Button";
import { Layout } from "src/components/shared/Layout";
import type { NoteType } from "src/types/types";

const MemosNoteId: NextPage<NoteType> = (props) => {
  const router = useRouter();
  const [isShowDeleteDialog, setIsShowDeleteDialog] = useState(false);
  const [content, setContent] = useState(props.content);

  const handleOpenDeleteDialog = useCallback(() => {
    setIsShowDeleteDialog(true);
  }, []);

  const handleCloseDeleteDialog = useCallback(() => {
    setIsShowDeleteDialog(false);
  }, []);

  const deleteNote = useCallback(async () => {
    await alert("TODO: 削除処理の追加");
  }, []);

  const handleDeleteNote = useCallback(async () => {
    try {
      await toast.promise(deleteNote(), {
        loading: "処理中",
        success: "削除しました",
        error: "失敗しました",
      });
      await router.push("/");
    } catch (error) {
      console.error(error);
    }
  }, [deleteNote, router]);

  const handleChangeContent = useCallback(async (event: ChangeEvent<HTMLTextAreaElement>) => {
    setContent(event.currentTarget.value);
  }, []);

  const handleOpenLabelDialog = useCallback(() => {
    alert("TODO: ラベル選択モーダルを出す");
  }, []);

  const handleCopy = useCallback(async () => {
    await navigator.clipboard.writeText(location.href);
    toast("コピーしました");
  }, []);

  return (
    <>
      <Layout
        left={
          <Anchor href={"/"} variant="ghost" className="h-10 w-10">
            <ChevronLeftIcon className="h-5 w-5" />
          </Anchor>
        }
        right={[
          <Button key="label" variant="ghost" className="h-10 w-10" onClick={handleOpenLabelDialog}>
            <TagIcon className="h-5 w-5" />
          </Button>,
          <Button key="copy" variant="ghost" className="h-10 w-10" onClick={handleCopy}>
            <ClipboardIcon className="h-5 w-5" />
          </Button>,
          <Button key="delete" variant="ghost" className="h-10 w-10" onClick={handleOpenDeleteDialog}>
            <TrashIcon className="h-5 w-5" />
          </Button>,
        ]}
      >
        <div className="flex h-[calc(100vh-168px)] flex-col sm:h-[calc(100vh-192px)]">
          <label htmlFor="memo" className="flex-1 cursor-text">
            <TextareaAutosize
              id="memo"
              style={{ caretColor: "#3B82F6" }}
              className="w-full resize-none border-none bg-transparent text-lg focus:ring-0 sm:text-xl"
              value={content}
              onChange={handleChangeContent}
              placeholder="メモを入力する"
              autoComplete="off"
            />
          </label>
        </div>
      </Layout>

      <ConfirmDialog
        show={isShowDeleteDialog}
        onClose={handleCloseDeleteDialog}
        onClickOk={handleDeleteNote}
        title="メモを削除"
        description="復元できませんがよろしいですか？"
        buttonText="削除する"
        buttonColor="red"
      />
    </>
  );
};

export default MemosNoteId;
