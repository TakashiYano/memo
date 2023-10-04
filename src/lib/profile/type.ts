import { z } from "zod";

import { type UserType } from "@/lib/user/type";

type ProfileSchema = {
  avatar_url: string | null;
  id: string;
  user_name: string;
};

export type ProfileIdType = { profile: Pick<ProfileSchema, "id"> };

export type ProfileContentType = { profile: Omit<ProfileSchema, "id"> };

export type ProfileAllType = { profile: ProfileSchema };

export const profileSchema = z.object({
  userName: z.string().nonempty({ message: "ユーザ名を入力してください" }),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;

export type UpsertUserProps = ProfileAllType & UserType & { selectedFile: File | undefined };
