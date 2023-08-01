import { ChevronLeftIcon, ClipboardIcon, TagIcon, TrashIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { useCallback } from "react";
import { toast } from "react-hot-toast";
import type { NoteType } from "src/api/handler/note/type";
import { Anchor, Button } from "src/component/Button";
import { ConfirmDialog } from "src/component/Dialog";
import { NoteEditor, useDeleteNote, useNoteDialog } from "src/pages-component/memo";
import { Layout } from "src/pages-layout/Layout";

const MemosNoteId: NextPage<NoteType> = (props) => {
  const { isShowMenu, handleOpenMenu, handleCloseMenu } = useNoteDialog();
  const { handleDeleteNote } = useDeleteNote();

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
          <Button key="delete" variant="ghost" className="h-10 w-10" onClick={handleOpenMenu}>
            <TrashIcon className="h-5 w-5" />
          </Button>,
        ]}
      >
        <div className="flex h-[calc(100vh-168px)] flex-col sm:h-[calc(100vh-192px)]">
          <NoteEditor {...props} />
        </div>
      </Layout>

      <ConfirmDialog
        show={isShowMenu}
        onClose={handleCloseMenu}
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
