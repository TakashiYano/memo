import type { UserType } from "src/api/handler/user/type";

type NoteCommonType = {
  id: string;
  public: boolean;
  updatedAt: string;
  content: string;
  excerpt: string;
  isMine: boolean;
  users: UserType;
};

export type NoteType = NoteCommonType & { content: string };

export type NoteWithUserType = NoteType & {
  users: UserType;
};

export type ListNoteType = Omit<NoteCommonType, "content" | "isMine" | "users">;

export const isNoteType = (data: any): data is NoteType => {
  return data.id !== undefined;
};
