type NoteSchema = {
  content: string | null;
  created_at: string;
  id: string;
  updated_at: string | null;
  user_id: string;
};

export type NoteDisplayType = Pick<NoteSchema, "content" | "id" | "updated_at">;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNoteType = (data: any): data is NoteSchema => {
  return data.id !== undefined;
};

export type NoteWithUserType = {
  note: Pick<NoteSchema, "content" | "id" | "updated_at">;
};

export type NoteListsType = { notes: NoteSchema[] };

export type NoteIdType = { note: Pick<NoteSchema, "id"> };
