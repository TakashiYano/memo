import { type User } from "@supabase/auth-helpers-nextjs";

export type UserType = {
  avatarUrl: string;
  id: string;
  name: string;
};

export type ProfileFormType = {
  profile: {
    avatar_url: string | null;
    id: string;
    user_name: string;
  } | null;
  user: User;
};

export type UpsertUserType = ProfileFormType & { selectedFile: File | undefined };

export type FooterType = Pick<ProfileFormType, "profile">;
