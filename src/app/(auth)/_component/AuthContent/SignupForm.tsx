"use client";

import { type FC } from "react";
import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { tv } from "tailwind-variants";

import { Button } from "@/component/Button";
import { Input } from "@/component/Form/Input";
import { signupFormSchema, type SignupFormSchemaType } from "@/lib/user/type";
import { useAuth } from "@/lib/user/useAuth";

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
  const { handleEmailSignup, isCreatingUser } = useAuth();
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignupFormSchemaType>({
    resolver: zodResolver(signupFormSchema),
    reValidateMode: "onSubmit",
  });

  return (
    <form className={base()} onSubmit={handleSubmit(handleEmailSignup)}>
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

      <Button type="submit" variant="solid" className={button()} disabled={isCreatingUser}>
        {isCreatingUser ? (
          <div className="h-7 w-7 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6" />
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
