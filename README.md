## Technologies
<p align="left">
  <a href="https://www.typescriptlang.org/"><img src="https://cdn.worldvectorlogo.com/logos/typescript.svg" height="50px;" /></a>
  <a href="https://nextjs.org/"><img src="https://cdn.worldvectorlogo.com/logos/next-js.svg" height="50px;" /></a>
  <a href="https://ja.reactjs.org/"><img src="https://cdn.worldvectorlogo.com/logos/react-2.svg" height="50px;" /></a>
  <a href="https://supabase.com/"><img src="" height="50px;" /></a>
  <a href="https://swr.vercel.app/ja"><img src="" height="50px;" /></a>
</p>
<p align="left">
  <a href="https://vercel.com/"><img src="https://user-images.githubusercontent.com/65433193/118944114-3b393980-b98f-11eb-84a5-fc9a1db8ea6b.png" height="50px;" /></a
  <a href="https://eslint.org/"><img src="https://cdn.worldvectorlogo.com/logos/eslint-1.svg" height="50px;" /></a>
  <a href="https://prettier.io/"><img src="https://cdn.worldvectorlogo.com/logos/prettier-2.svg" height="50px;" /></a>
  <a href="https://tailwindcss.com/"><img src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg" height="50px;"></a>
  <a href="https://headlessui.com/"><img src="" height="50px;"></a>
  <a href="https://jestjs.io/ja/"><img src="https://user-images.githubusercontent.com/65433193/118944023-265ca600-b98f-11eb-83d8-5635a4f69b9a.png" height="50px;" /></a>
  <a href="https://testing-library.com/docs/react-testing-library/intro/"><img src="" height="50px;" /></a>
  <a href="https://mswjs.io/"><img src="" height="50px;" /></a>
</p>

|   領域   |  技術やツール  |
| ---- | ---- |
|  フロントエンド  |  Next.js(React)/TypeScript/ |
|  バックエンド  |  Supabase |
|  状態管理/データフェッチ  |  SWR |
|  スタイル  | Headless UI/Tailwind CSS |
|  Hosting  |  Vercel |
|  認証  |  Supabase Authentication |
|  ストレージ  |  Supabase Storage |
|  Linter/Formatter  |  ESLint/Prettier |
|  Testing  |  Jest/React Testing Library/Mock Service Worker |

### その他ライブラリ等
- husky(pre commit時のコードlint)
- react-textarea-autosize(テキストエリア実装)
- react-hot-toast(トースト実装)

## Impressions

### 苦労した点、悩んだ点
- UIコンポーネントの配色
- TypeScriptをReactで使う際の型定義
- コンポーネント分割の粒度
- 再レンダリングの抑制(useMemo,React.memo,useCallback等)
- SWRによるデータのcacheの取り扱い
- 非同期処理
