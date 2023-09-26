import { z } from "zod";

export const signFormSchema = z
  .object({
    email: z.string().email({ message: "不正なメールアドレスです" }),
    password: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .regex(
        /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
        "パスワードは半角英数字混合で入力してください"
      ),
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

export type SignFormSchemaType = z.infer<typeof signFormSchema>;
