import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, type SubmitHandler } from "react-hook-form";

import { signFormSchema, type SignFormSchemaType } from "@/lib/form/SignForm";

export const useSignForm = () => {
  const {
    formState: { errors },
    handleSubmit,
    register,
  } = useForm<SignFormSchemaType>({
    resolver: zodResolver(signFormSchema),
    reValidateMode: "onSubmit",
  });

  const onSubmit: SubmitHandler<SignFormSchemaType> = (data) => {
    try {
      console.log(data);
      // TODO：ログイン処理
    } catch (error) {
      console.error(error);
      alert("ログインに失敗しました");
    }
  };

  return {
    errors,
    onSubmit: handleSubmit(onSubmit),
    register,
  };
};
