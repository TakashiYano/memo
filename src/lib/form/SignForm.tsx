import { z } from "zod";

const password = /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i;

export const signupFormSchema = z
  .object({
    email: z.string().email({ message: "不正なメールアドレスです" }),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .regex(password, "パスワードは半角英数字混合で入力してください"),
    passwordConfirm: z.string().nonempty({ message: "確認用パスワードを入力してください" }),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "パスワードが一致しません",
      path: ["passwordConfirm"],
    }
  );

export type SignupFormSchemaType = z.infer<typeof signupFormSchema>;

export const signinFormSchema = z.object({
  email: z.string().email({ message: "不正なメールアドレスです" }),
  password: z
    .string()
    .min(8, "パスワードは8文字以上で入力してください")
    .regex(password, "パスワードは半角英数字混合で入力してください"),
});

export type SigninFormSchemaType = z.infer<typeof signinFormSchema>;
