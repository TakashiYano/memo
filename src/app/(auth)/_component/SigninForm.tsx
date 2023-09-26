import { type FC } from "react";
import Link from "next/link";

import { tv } from "tailwind-variants";

import { Button } from "@/component/Button/Button";
import { Input } from "@/component/Form/Input";
import { useSigninForm } from "@/lib/form/useSignForm";

const form = tv({
  slots: {
    base: "space-y-4 md:space-y-6",
    button:
      "w-full rounded-xl py-4 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-11",
    checkbox:
      "h-4 w-4 rounded border border-indigo-6 bg-indigo-3 focus:outline-none focus:ring-2 focus:ring-blue-11 dark:border-indigodark-6 dark:bg-indigodark-3",
    container: "flex items-center",
    label: "text-indigo-12 dark:text-indigodark-12 ml-3 text-sm",
    link: "font-medium text-indigo-11 hover:underline dark:text-indigodark-11",
    text: "text-sm font-light opacity-70",
  },
});

export const SigninForm: FC = () => {
  const { base, button, checkbox, container, label, link, text } = form();
  const { errors, onSubmit, register } = useSigninForm();

  return (
    <form className={base()} onSubmit={onSubmit}>
      <Input
        id="email"
        required
        label="メールアドレス"
        placeholder="test@example.com"
        {...register("email")}
        error={errors.email?.message}
      />
      <Input
        id="password"
        required
        label="パスワード"
        placeholder="Your password"
        {...register("password")}
        error={errors.password?.message}
      />

      <div className={container({ class: "justify-between" })}>
        <div className={container()}>
          <div className={container({ class: "h-5" })}>
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className={checkbox()}
            />
          </div>
          <label htmlFor="remember" className={label()}>
            ログイン状態を保持
          </label>
        </div>
        <Link href="/forgot-password" className={link()}>
          パスワードをお忘れですか?
        </Link>
      </div>

      <Button type="submit" variant="solid" className={button()}>
        ログイン
      </Button>

      <p className={text()}>
        アカウントをお持ちでないですか？
        <Link href={"/signup"} className={link()}>
          新規登録
        </Link>
      </p>
    </form>
  );
};
