export type User = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type UserPutRequest = User | Pick<User, "id" | "name"> | Pick<User, "id" | "avatarUrl">;

export const hasName = (user: UserPutRequest): user is User | Pick<User, "id" | "name"> => {
  return "name" in user;
};

export const hasAvatarUrl = (user: UserPutRequest): user is User | Pick<User, "id" | "avatarUrl"> => {
  return "avatarUrl" in user;
};

export const EXAMPLE_USER_01: User = {
  id: "enginner",
  name: "エンジニア",
  avatarUrl: "/mocks/avatar01.jpg",
};

export const EXAMPLE_USER_02: User = {
  id: "gamer",
  name: "ゲーマー",
  avatarUrl: "/mocks/avatar02.jpg",
};
