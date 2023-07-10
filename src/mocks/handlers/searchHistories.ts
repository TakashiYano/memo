import { rest } from "msw";
import { EXAMPLE_SEARCH_HISTORIES } from "src/models/searchHistory";
import type { SearchHistoryType } from "src/type/types";

export const searchHistoriesHandlers = [
  // 自分の検索履歴を表示する
  rest.get<never, { userId: string }, SearchHistoryType[]>("/users/:userId/searchHistories", (_req, res, ctx) => {
    return res(ctx.delay(1000), ctx.status(200), ctx.json(EXAMPLE_SEARCH_HISTORIES));
  }),
  // 自分の検索履歴に追加する
  rest.post<string, { userId: string }, { id: string }>("/users/:userId/searchHistories", (req, res, ctx) => {
    const body: Pick<SearchHistoryType, "keyword"> = JSON.parse(req.body);
    // eslint-disable-next-line no-console
    console.log(body.keyword);
    return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
  }),
  // 自分の特定の検索履歴を削除する
  rest.delete<never, { userId: string; searchHistoriesId: string }, { id: string }>(
    "/users/:userId/searchHistories/:searchHistoriesId",
    (_req, res, ctx) => {
      return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: "foo" }));
    }
  ),
];
