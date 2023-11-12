export type Label = {
  color: string;
  id: string;
  name: string;
};

export type NoteLabel = {
  id: string;
  label_id: string;
  note_id: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isLabelType = (data: any): data is Label => {
  return data.id !== undefined;
};
