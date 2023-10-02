type NoteSchema = {
  content: string | null;
  id: string;
  updated_at: string | null;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNoteType = (data: any): data is NoteSchema => {
  return data.id !== undefined;
};

export type NoteWithUserType = {
  note: { content: string | null; id: string; updated_at: string | null };
};

export type NoteListsType = { note: NoteSchema[] };

export type NoteListItemType = { note: NoteSchema };
