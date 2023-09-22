import type { UserType } from "src/lib/user";

type NoteCommonType = {
  id: string;
  public: boolean;
  updatedAt: string;
  excerpt: string;
  isMine: boolean;
};

/** @package */
export type NoteType = NoteCommonType & { content: string };

/** @package */
export type NoteWithUserType = NoteType & {
  users: UserType;
};

/** @package */
export type ListNoteType = Omit<NoteCommonType, "content" | "isMine" | "users">;
