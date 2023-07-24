export type UserType = {
  id: string;
  name: string;
  avatarUrl: string;
};

export type UserPutRequest = UserType | Pick<UserType, "id" | "name"> | Pick<UserType, "id" | "avatarUrl">;
