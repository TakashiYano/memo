export type Note = {
  id: number;
  content: string;
  public: boolean;
};

export type ListNote = {
  id: number;
  excerpt: string;
  public: boolean;
};

export const EXAMPLE_NOTE: Note = {
  id: 123,
  content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit
  
  content
  ・At architecto modi neque, laudantium quidem dicta ipsam voluptates error magnam, cum quibusdam accusamus officiis ex. Architecto minima sequi doloribus veritatis ipsum.
  `,
  public: false,
};

export const EXAMPLE_NOTE_LIST: ListNote[] = [
  {
    id: 5,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
  },
  {
    id: 4,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
  },
  {
    id: 3,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
  },
  {
    id: 2,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
  },
  {
    id: 1,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
  },
];

export const EXAMPLE_OTHER_USER_NOTE_LIST: ListNote[] = [
  {
    id: 5,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
  },
  {
    id: 4,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
  },
  {
    id: 3,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
  },
  {
    id: 2,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
  },
  {
    id: 1,
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
  },
];
