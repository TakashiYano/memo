import { type FC } from "react";
import Link from "next/link";

import { tv } from "tailwind-variants";

import { Button } from "@/component/Button/Button";
import { Input } from "@/component/Form/Input";
import { useSignupForm } from "@/lib/form/useSignForm";

const form = tv({
  slots: {
    base: "space-y-4 md:space-y-6",
    button:
      "w-full rounded-xl py-4 text-center text-sm font-medium focus:outline-none focus:ring-4 focus:ring-indigo-11",
    link: "font-medium text-indigo-11 hover:underline dark:text-indigodark-11",
    text: "text-sm font-light opacity-70",
  },
});

export const SignupForm: FC = () => {
  const { base, button, link, text } = form();
  const { errors, isLoading, onSubmit, register } = useSignupForm();

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
      <Input
        id="passwordConfirm"
        required
        label="確認用パスワード"
        placeholder="Your password"
        {...register("passwordConfirm")}
        error={errors.passwordConfirm?.message}
      />

      <Button type="submit" variant="solid" className={button()} disabled={isLoading}>
        {isLoading ? (
          <div className="flex items-center space-x-2">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6" />
            <div>新規登録しています</div>
          </div>
        ) : (
          <div>新規登録</div>
        )}
      </Button>

      <p className={text()}>
        アカウントを既にお持ちですか？
        <Link href={"/signin"} className={link()}>
          ログイン
        </Link>
      </p>
    </form>
  );
};
