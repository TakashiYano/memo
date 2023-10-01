import { type User } from "@supabase/auth-helpers-nextjs";

import { type Database } from "@/lib/supabase/type";

export type UserType = {
  avatarUrl: string;
  id: string;
  name: string;
};

type ProfileType = {
  profile: Database["public"]["Tables"]["profiles"]["Row"] | null;
};
type UserProps = { user: User };

export type ProfileFormType = ProfileType & UserProps;

export type UpsertUserType = ProfileType & UserProps & { selectedFile: File | undefined };

export type FooterType = ProfileType;

export type HeaderType = { isHeaderNarrow?: boolean } & UserProps;

export type NoteWriteType = UserProps;

export type NoteHeaderType = { note: { id: string } };
