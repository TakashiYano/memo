export type Note = {
  id: string;
  content: string;
  public: boolean;
  date: string;
};

export type ListNote = {
  id: string;
  excerpt: string;
  public: boolean;
  date: string;
};

export const EXAMPLE_NOTE: Note = {
  id: "123",
  content: `Lorem ipsum dolor, sit amet consectetur adipisicing elit
  
  content
  ・At architecto modi neque, laudantium quidem dicta ipsam voluptates error magnam, cum quibusdam accusamus officiis ex. Architecto minima sequi doloribus veritatis ipsum.
  `,
  public: false,
  date: "2021/3/1",
};

export const EXAMPLE_MY_NOTE_LIST: ListNote[] = [
  {
    id: "5",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
    date: "2020/10/11",
  },
  {
    id: "4",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
    date: "2020/12/11",
  },
  {
    id: "3",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
    date: "2021/2/1",
  },
  {
    id: "2",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
    date: "2021/3/1",
  },
  {
    id: "1",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
    date: "2021/3/20",
  },
];

export const EXAMPLE_OTHER_USER_NOTE_LIST: ListNote[] = [
  {
    id: "5",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
    date: "2020/10/11",
  },
  {
    id: "4",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
    date: "2020/10/21",
  },
  {
    id: "3",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
    date: "2020/12/11",
  },
  {
    id: "2",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: false,
    date: "2021/01/15",
  },
  {
    id: "1",
    excerpt: `Lorem ipsum dolor, sit amet consectetur adipisicing elit`,
    public: true,
    date: "2021/02/20",
  },
];
