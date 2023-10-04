"use client";

import { type FC } from "react";

import { tv } from "tailwind-variants";

import { SigninForm } from "@/app/(auth)/_component/SigninForm";
import { SignupForm } from "@/app/(auth)/_component/SignupForm";
import { Button } from "@/component/Button/Button";
import { GoogleIcon } from "@/component/Icon/GoogleIcon";
import { useAuth } from "@/lib/user/useAuth";

type SignProps = {
  page: "signin" | "signup";
};

const form = tv({
  slots: {
    base: "flex min-h-screen flex-col items-center justify-center px-4",
    button:
      "w-full rounded-xl py-4 hover:bg-indigo-6 focus:outline-none focus:ring-2 focus:ring-blue-11 dark:hover:bg-indigodark-6",
    container:
      "space-y-4 p-6 sm:p-8 md:space-y-6 w-full rounded-lg border border-indigo-6 bg-indigo-2 shadow dark:border-indigodark-6 dark:bg-indigodark-2 sm:max-w-md md:mt-0 xl:p-0",
    divideContainer: "flex items-center space-x-2",
    hr: "grow border-indigo-6 dark:border-indigodark-6",
    icon: "mr-3 h-5 w-5",
    logo: "mb-6 flex items-center text-2xl font-semibold text-indigo-12 dark:text-indigodark-12",
    text: "text-sm text-indigo-11 dark:text-indigodark-11",
    title:
      "text-xl font-bold leading-tight tracking-tight text-indigo-12 dark:text-indigodark-12 md:text-2xl",
  },
});

export const Sign: FC<SignProps> = (props) => {
  const { page } = props;
  const { base, button, container, divideContainer, hr, icon, logo, text, title } = form();
  const { handleGoogleSignin } = useAuth();

  return (
    <div className={base()}>
      <div className={logo()}>Memo</div>
      <div className={container()}>
        <h1 className={title()}>{page === "signin" ? "ログイン" : "新規登録"}</h1>

        <Button onClick={handleGoogleSignin} variant="outline" className={button()}>
          <div className="flex">
            <GoogleIcon className={icon()} />
            {page === "signin" ? "Googleでログイン" : "Googleで新規登録"}
          </div>
        </Button>

        <div className={divideContainer()}>
          <hr className={hr()} />
          <span className={text()}>OR</span>
          <hr className={hr()} />
        </div>

        {page === "signin" ? <SigninForm /> : <SignupForm />}
      </div>
    </div>
  );
};
