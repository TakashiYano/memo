/* eslint-disable @typescript-eslint/naming-convention */
import type { NextPage } from "next";
import { useRouter } from "next/router";
import type { ComponentProps } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { CheckCircle } from "src/components/icon/CheckCircle";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { DotsCircleHorizontalIcon } from "src/components/icon/DotsCircleHorizontalIcon";
import { MemoMenu } from "src/components/MemoMenu";
import { Button } from "src/components/shared/Button";
import { EXAMPLE_USER_01 } from "src/models/user";
import type { NotePostRequest, NotePutRequest, NoteType } from "src/types/types";
import useSWR from "swr";

// ユーザ情報はログイン時に取得している想定のため、一旦固定値にする
// Google認証でもApple認証でもOAuth2.0ならトークンでユーザ情報取得しているはず
const user = EXAMPLE_USER_01;

const InitialData: NoteType = {
  id: "0",
  content: "",
  public: false,
};

const Note: NextPage = () => {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [publicFlg, setPublicFlg] = useState(false);
  const [publicOpen, setPublicOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [memoDelete, setMemoDelete] = useState(false);

  const { data, error, mutate } = useSWR<NoteType>(`/notes/${router.query.noteId}`, {
    initialData: InitialData,
  });

  useEffect(() => {
    setContent(data?.content ?? "");
    setPublicFlg(data?.public ?? false);
  }, [data?.content, data?.public]);

  if (error && router.query.noteId !== "new") {
    // 検索結果が取得できなかった場合のエラー処理
    return null;
  }

  if (!data) {
    // 検索結果取得時のローディング処理
    return null;
  }

  // 入力値の保存
  const handleContentChange: ComponentProps<"textarea">["onChange"] = (e) => {
    setContent(e.currentTarget.value);
  };
  // メモ公開後のボタンクローズ
  const handlePublicClose = () => {
    setPublicOpen(!publicOpen);
  };
  // メニューオープン
  const handleMenuOpen = () => {
    setMenuOpen(true);
  };
  // メニュークローズ
  const handleMenuClose = () => {
    setMenuOpen(false);
  };
  // 削除確認画面閉じる
  const handleDeleteModalClose = () => {
    setMemoDelete(false);
  };
  // 削除確認画面起動
  const handleDeleteModalOpen = () => {
    setMemoDelete(true);
    setMenuOpen(false);
  };
  // 公開する・しないの切替
  const handlePublicClick = () => {
    const feachUpdate = async () => {
      const req: NotePutRequest = { id: data.id, public: !publicFlg };
      // 更新
      await fetch(`/notes/${data.id}/public`, {
        method: "patch",
        body: JSON.stringify(req),
      });
      await mutate;
    };
    feachUpdate();
    if (!publicFlg) {
      setPublicFlg(true);
    }
    setPublicFlg(!publicFlg);
    setMenuOpen(false);
  };
  // メモ更新
  const handleContentSave = () => {
    const fetchUpdate = async () => {
      if (data?.id === "0") {
        // 登録処理
        const req: NotePostRequest = { content: content, public: false };
        await fetch(`/notes`, {
          method: "post",
          body: JSON.stringify(req),
        });
      } else {
        // 更新処理
        if (data) {
          const req: NotePutRequest = { id: data.id, content: content };
          await fetch(`/notes/${data.id}`, {
            method: "put",
            body: JSON.stringify(req),
          });
        }
      }
      await mutate;
    };
    router.push(`/users/${user.id}`);
    fetchUpdate();
  };
  // メモ削除
  const handleMemoDeleteClick = () => {
    const feachDelete = async () => {
      await fetch(`/notes/${data.id}`, {
        method: "delete",
      });
      await mutate;
    };
    router.push(`/users/${user.id}`);
    feachDelete();
  };

  return (
    <div className="max-w-screen-sm mx-auto h-screen flex flex-col">
      <div className="relative flex items-center justify-between">
        <div>
          <Button button bgColor="transparent" textColor="black" onClick={handleContentSave}>
            <ChevronLeft />
          </Button>
        </div>

        <div className="ml-auto flex items-center">
          {data?.public ? (
            <span className="py-1 px-2 rounded-full w-auto text-xs text-white bg-yellow-500">公開中</span>
          ) : null}
          <Button button bgColor="transparent" textColor="black" onClick={handleMenuOpen}>
            <DotsCircleHorizontalIcon />
          </Button>
        </div>
      </div>

      <div className="h-full w-full p-4 outline-none transition-colors">
        <textarea
          className="min-h-full w-full px-2 outline-none transition-colors"
          value={content}
          onChange={handleContentChange}
          placeholder="本文を入力する"
        />
      </div>

      {publicOpen ? (
        <div className="z-50 absolute left-1/2 transform -translate-x-1/2">
          <Button button startIcon={<CheckCircle />} onClick={handlePublicClose}>
            メモを公開しました
          </Button>
        </div>
      ) : null}

      <MemoMenu
        memoDelete={memoDelete}
        onDeleteModalClose={handleDeleteModalClose}
        onDeleteModalOpen={handleDeleteModalOpen}
        onMemoDeleteClick={handleMemoDeleteClick}
        menuOpen={menuOpen}
        onMenuClose={handleMenuClose}
        publicFlg={publicFlg}
        onPublicClick={handlePublicClick}
      />
    </div>
  );
};

export default Note;
