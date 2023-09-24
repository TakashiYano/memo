import { type UserType } from "@/lib/user/type";

type NoteCommonType = {
  excerpt: string;
  id: string;
  isMine: boolean;
  updatedAt: string;
};

export type NoteType = NoteCommonType & { content: string };

export type NoteWithUserType = NoteType & {
  users: UserType;
};

export type ListNoteType = Omit<NoteCommonType, "content" | "isMine" | "users">;
