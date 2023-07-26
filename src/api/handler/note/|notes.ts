import { rest } from "msw";

import { EXAMPLE_NOTE } from "./data";

const endpoint = "/notes";

/**
 * @package 自分のメモ一覧を取得する
 */
export const getNotes = rest.get<string, never, { id: string }>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json(EXAMPLE_NOTE));
});

/**
 * @package 新しいメモを作成する
 */
export const postNotes = rest.post<string, never, { id: string }>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
});
