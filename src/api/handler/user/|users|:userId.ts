import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import type { UserPutRequest, UserType } from "./type";

const endpoint = `${API_URL}//user/:userId`;

/**
 * @package 特定のユーザーの情報を取得する
 */
export const getUsersUserId = rest.get<never, { userId: string }, UserType>(endpoint, (req, res, ctx) => {
  const { userId } = req.params;
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER_01, id: userId }));
});

/**
 * @package 特定のユーザー（自分）の情報を更新する
 */
export const putUsersUserId = rest.put<string, { userId: string }, UserType>(endpoint, async (req, res, ctx) => {
  const { userId } = req.params;
  const body: UserPutRequest = await req.json();
  // eslint-disable-next-line no-console
  console.log({ サーバーが受け取ったリクエスト: body });
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ ...EXAMPLE_USER_02, id: userId }));
});

export const EXAMPLE_USER_01: UserType = {
  id: "engineer",
  name: "yanot",
  avatarUrl: "/mocks/avatar01.jpg",
};

export const EXAMPLE_USER_02: UserType = {
  id: "gamer",
  name: "yanot",
  avatarUrl: "/mocks/avatar02.jpg",
};
