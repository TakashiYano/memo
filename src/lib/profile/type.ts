import { z } from "zod";

type ProfileSchema = {
  avatar_url: string | null;
  id: string;
  user_name: string;
};

export type ProfileIdType = { profile: Pick<ProfileSchema, "id"> };

export type ProfileContentType = { profile: Omit<ProfileSchema, "id"> };

export type ProfileAllType = { profile: ProfileSchema };

export type ProfileOrNullType = { profile: ProfileSchema | null };

export const profileSchema = z.object({
  userName: z.string().nonempty({ message: "ユーザ名を入力してください" }),
});

export type ProfileSchemaType = z.infer<typeof profileSchema>;
