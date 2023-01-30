import type { UserPutRequest, UserType } from "src/types/types";

export const hasName = (user: UserPutRequest): user is UserType | Pick<UserType, "id" | "name"> => {
  return "name" in user;
};

export const hasAvatarUrl = (user: UserPutRequest): user is UserType | Pick<UserType, "id" | "avatarUrl"> => {
  return "avatarUrl" in user;
};

export const EXAMPLE_USER_01: UserType = {
  id: "engineer",
  name: "エンジニア",
  avatarUrl: "/mocks/avatar01.jpg",
};

export const EXAMPLE_USER_02: UserType = {
  id: "gamer",
  name: "ゲーマー",
  avatarUrl: "/mocks/avatar02.jpg",
};
