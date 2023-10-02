type NoteCommonType = {
  excerpt: string;
  id: string;
  isMine: boolean;
  updatedAt: string;
};

type NoteSchema = {
  content: string | null;
  id: string;
  updated_at: string | null;
};

export type NoteType = NoteCommonType & { content: string };

export type ListNoteType = Omit<NoteCommonType, "content" | "isMine" | "users">;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNoteType = (data: any): data is NoteSchema => {
  return data.id !== undefined;
};

export type NoteWithUserType = {
  note: { content: string | null; id: string; updated_at: string | null };
};

export type NoteListsType = { note: NoteSchema[] };

export type NoteListItemType = { note: NoteSchema };

export type NoteListType = {
  note: {
    content: string | null;
    created_at: string;
    id: string;
    updated_at: string | null;
    user_id: string;
  };
};
