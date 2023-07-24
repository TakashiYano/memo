import { rest } from "msw";

import type { UserType } from "./type";

const endpoint = "/users";

/**
 * @package ユーザーを作成する
 */
export const postUsers = rest.post<string, never, UserType>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json(EXAMPLE_USER_01));
});

const EXAMPLE_USER_01: UserType = {
  id: "engineer",
  name: "yanot",
  avatarUrl: "/mocks/avatar01.jpg",
};
