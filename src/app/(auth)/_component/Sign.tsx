"use client";

import { type FC } from "react";
import Link from "next/link";

import { Button } from "@/component/Button/Button";
import { Input } from "@/component/Form/Input";
import { GoogleIcon } from "@/component/Icon/GoogleIcon";
import { useAuth } from "@/lib/user/useAuth";

type SignProps = {
  page: "signin" | "signup";
};

export const Sign: FC<SignProps> = (props) => {
  const { page } = props;
  const { handleSignInWithGoogle } = useAuth();

  const handleSignIn = () => {
    // TODO：ログイン処理
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center px-6 py-8 md:h-screen lg:py-0">
      <div className="mb-6 flex items-center text-2xl font-semibold text-indigo-12 dark:text-indigodark-12">
        Memo
      </div>
      <div className="w-full rounded-lg border border-indigo-6 bg-indigo-2 shadow dark:border-indigodark-6 dark:bg-indigodark-2 sm:max-w-md md:mt-0 xl:p-0">
        <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-indigo-12 dark:text-indigodark-12 md:text-2xl">
            {page === "signin" ? "ログイン" : "新規登録"}
          </h1>

          <Button
            onClick={handleSignInWithGoogle}
            variant="outline"
            className="w-full rounded-xl py-4 hover:bg-indigo-6 focus:outline-none focus:ring-2 focus:ring-blue-11 dark:hover:bg-indigodark-6"
          >
            <div className="flex">
              <GoogleIcon className="mr-3 h-5 w-5" />
              {page === "signin" ? "Googleでログイン" : "Googleで新規登録"}
            </div>
          </Button>

          <div className="flex items-center space-x-2">
            <hr className="grow border-indigo-6 dark:border-indigodark-6" />
            <span className="text-sm text-indigo-11 dark:text-indigodark-11">OR</span>
            <hr className="grow border-indigo-6 dark:border-indigodark-6" />
          </div>

          <Input label="メールアドレス" name="メールアドレス" placeholder="test@example.com" />
          <Input label="パスワード" name="パスワード" placeholder="Your password" />

          {page === "signin" ? (
            <div className="flex items-center justify-between">
              <div className="flex items-start">
                <div className="flex h-5 items-center">
                  <input
                    id="remember"
                    aria-describedby="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border border-indigo-6 bg-indigo-3 focus:outline-none focus:ring-2 focus:ring-blue-11 dark:border-indigodark-6 dark:bg-indigodark-3"
                    required
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="remember" className="text-indigo-12 dark:text-indigodark-12">
                    ログイン状態を保持
                  </label>
                </div>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-indigo-11 hover:underline dark:text-indigodark-11"
              >
                パスワードをお忘れですか?
              </Link>
            </div>
          ) : null}

          <Button
            onClick={handleSignIn}
            type="submit"
            variant="solid"
            className="w-full rounded-xl py-4 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-11"
          >
            {page === "signin" ? "ログイン" : "新規登録"}
          </Button>

          <p className="text-sm font-light opacity-70">
            {page === "signin"
              ? "アカウントをお持ちでないですか？"
              : "アカウントを既にお持ちですか？"}
            <Link
              href={page === "signin" ? "/signup" : "/signin"}
              className="font-medium text-indigo-11 hover:underline dark:text-indigodark-11"
            >
              {page === "signin" ? "新規登録" : "ログイン"}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
