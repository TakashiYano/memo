import { rest } from "msw";

import type { SearchHistoryType } from "./type";

const endpoint = "/user/:userId/searchHistories";

/**
 * @package 自分の検索履歴を表示する
 */
export const getUsersUserIdSearchHistories = rest.get<never, { userId: string }, SearchHistoryType[]>(
  endpoint,
  (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_SEARCH_HISTORIES));
  }
);

/**
 * @package 自分の検索履歴に追加する
 */
export const postUsersUserIdSearchHistories = rest.post<string, { userId: string }, { id: string }>(
  endpoint,
  async (req, res, ctx) => {
    const body: Pick<SearchHistoryType, "keyword"> = await req.json();
    // eslint-disable-next-line no-console
    console.log(body.keyword);
    return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
  }
);

export const EXAMPLE_SEARCH_HISTORIES: SearchHistoryType[] = [
  { id: 3, keyword: "Vue.js", createdOn: "2023-06-01T00:00:00.000Z" },
  { id: 2, keyword: "React", createdOn: "2023-07-01T00:00:00.000Z" },
  { id: 1, keyword: "JavaScript", createdOn: "2023-08-01T00:00:00.000Z" },
];
