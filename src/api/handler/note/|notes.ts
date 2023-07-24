import { rest } from "msw";

const endpoint = "/notes";

/**
 * @package 新しいメモを作成する
 */
export const postNotes = rest.post<string, never, { id: string }>(endpoint, (_req, res, ctx) => {
  return res(ctx.delay(1000), ctx.status(201), ctx.json({ id: "foo" }));
});
