import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

const endpoint = `${API_URL}/user/:userId/searchHistories/:searchHistoriesId`;

/**
 * @package 自分の特定の検索履歴を削除する
 */
export const deleteUsersUserIdSearchHistoriesSearchHistoriesId = rest.delete<
  never,
  { userId: string; searchHistoriesId: string },
  { id: string }
>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(200), ctx.json({ id: "foo" }));
});
