import { rest } from "msw";
import { API_URL } from "src/api/endpoint";

import { EXAMPLE_NOTE_LIST } from "./data";
import type { ListNoteType } from "./type";

const endpoint = `${API_URL}//user/:userId/notes/search/:keyword`;

/**
 * @package 自分または特定のユーザーのメモ一覧を検索して取得する
 */
export const getUsersUserIdNotesSearchKeyword = rest.get<string, { userId: string; keyword: string }, ListNoteType[]>(
  endpoint,
  (req, res, ctx) => {
    const data = req.params.keyword.length > 2 ? [EXAMPLE_NOTE_LIST[1]] : [EXAMPLE_NOTE_LIST[1], EXAMPLE_NOTE_LIST[2]];
    return res(ctx.delay(1000), ctx.status(200), ctx.json(data));
  }
);
