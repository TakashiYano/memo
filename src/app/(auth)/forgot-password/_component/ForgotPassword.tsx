"use client";

import { type FC } from "react";
import Link from "next/link";

import { ArrowLeftIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button/Button";
import { Input } from "@/component/Form/Input";

export const ForgotPassword: FC = () => {
  const handleReset = () => {
    // TODO：リセット処理
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="mb-6 flex items-center text-2xl font-semibold text-indigo-12 dark:text-indigodark-12">
        Memo
      </div>
      <div className="w-full rounded-lg border border-indigo-6 bg-indigo-2 shadow dark:border-indigodark-6 dark:bg-indigodark-2 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-12 dark:text-indigodark-12 md:text-2xl">
            パスワードリセット
          </h1>
          <Input label="メールアドレス" name="メールアドレス" placeholder="test@example.com" />

          <div className="flex items-center justify-between">
            <div className="flex items-start">
              <Link
                href="/signin"
                className="flex items-center text-sm font-medium text-indigo-11 hover:underline dark:text-indigodark-11"
              >
                <ArrowLeftIcon className="h-5 w-5" />
                ログインページに戻る
              </Link>
            </div>
            <Button
              onClick={handleReset}
              type="submit"
              variant="solid"
              className="rounded-xl p-4 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-11"
            >
              リセットする
            </Button>
          </div>

          <p className="text-sm font-light opacity-70">
            リセットするためにメールアドレスをご入力ください
          </p>
        </div>
      </div>
    </div>
  );
};
