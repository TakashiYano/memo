import { type User } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/lib/supabase/type";

type ProfileType = {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
};

type ProfileSchema = {
  avatar_url: string | null;
  id: string;
  user_name: string;
};

// type UserSchema = User;

type UserProps = { user: User };

export type ProfileIdProps = { profile: Pick<ProfileSchema, "id"> };

export type ProfileNavProps = { profile: Omit<ProfileSchema, "id"> };

export type ProfileAllProps = { profile: ProfileSchema };

export type ProfileFormType = ProfileType & UserProps;

export type UpsertUserType = ProfileType & UserProps & { selectedFile: File | undefined };

export type HeaderType = { isHeaderNarrow?: boolean } & UserProps;

export type NoteWriteType = UserProps;

export type NoteHeaderType = { note: { id: string } };
