# 作業記録

## 環境構築

- Next.js 13 app directory（レイアウトシステム、ディレクトリ構成、フォント最適化、環境変数、SEO）
- React（記述ルール）
- TypeScript（絶対パス指定）
- TailwindCSS（カラーシステム、状態に応じたユーティリティの付与）
- ESLint、Prettier（設定、パッケージ導入）
- husky、lint-staged（設定）
- Supabase（リクエストとレスポンスの型安全性の確保）

### Next.js 13 app directory（レイアウトシステム、ディレクトリ構成、フォント最適化、環境変数）

レイアウトシステム

- ルーティング
  - ルーティングに対応するファイルは page.tsx
  - 共通されたレイアウトを担当する layout.tsx
  - ローディング UI を表示する loading.ysx
- レンダリング
  - App Router 内のコンポーネントはデフォルトで Server Component
  - Client Component として扱いたい場合には "use client" をファイルの先頭で宣言
- データフェッチング
  - Server Component で async/await を使用してデータを取得
  - データの取得時にキャッシュやリクエストの重複排除を活用するため fetch API を利用
- キャッシュ
  - fetch API 用いてデータを取得する際にはデフォルトで Next.js による HTTP キャッシュが有効

ディレクトリ構成

- ディレクトリ・ファイル名は単数形
- Next.js のレイアウトを使う
- pages は最低限
  - SG, SSR などをさせる
  - SEO 対策
- 全部ライブラリの概念で作る
  - index.ts は re-export を行うだけ
- ライブラリ利用側は直接参照しない
  - すべて index.ts から import する
- コンポーネントを 3 種類に分ける
  - 共有コンポーネントは component
  - pages 固有のコンポーネントは \_component
  - 分割するだけのコンポーネントは同一ファイル内

フォント最適化

- Google フォントをセルフホスティング
  - next/font を利用することで、サイトで使用するフォントが自動的に Next.js サーバでセルフホスティング
  - layout.tsx が適応される複数ページに対してフォントを適用

```tsx
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" suppressHydrationWarning className={inter.className}>
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
```

環境変数

- NEXT*PUBLIC*という接頭語をつけた環境変数は、ブラウザサイドのコードでアクセス可能
- .env.local ファイルをプロジェクトのルートディレクトリに作成
- .gitignore ファイルに .env.local を追加

```
NEXT_PUBLIC_API_URL=your-api-key
```

- Next.js で環境変数を利用するときは process.env を通じて参照する
- TypeScript を用いている場合には環境変数の型を定義することで、型安全にコードを書く

```ts
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NEXT_PUBLIC_API_KEY: string;
  }
}
```

SEO（Metadata API を利用して SEO 設定）

- 静的な設定
  - ベースとなるメタデータの設定ファイルを作成
  - app/opengraph-image.(jpg|jpeg|png|gif) とすることで自動的に OGP 設定されるようになった

```tsx
import { Metadata } from "next";

const siteName = "";
const description = "";
const url = "";

export const SEO_DEFAULT: Metadata = {
  metadataBase: new URL(url),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  description,
  openGraph: {
    title: siteName,
    description,
    url,
    siteName,
    locale: "ja_JP",
    type: "website",
    images: "/opengraph-image.png",
  },
};
```

- 動的な設定
  - 各メモのページなどでタイトルが動的に変更される場合がある
  - generateMetadata 内で取得したデータによって上書き

```tsx
import { Metadata } from "next";
import { notFound } from "next/navigation";

import { Post } from "../../components/post/views/Post";
import { getPost } from "../../utils/useCase/postUseCase";

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const { post } = await getPost(params.slug);

  return {
    title: post?.title,
    openGraph: {
      title: post?.title,
      url: `https://www.hogehoge.com/${post?.id}`,
      type: "article",
      images: [
        {
          url: post?.thumbnail?.url,
          width: 1200,
          height: 630,
          alt: post?.title,
        },
      ],
    },
  };
};

const PostPage = async ({ params: { slug } }: { params: { slug: string } }) => {
  const { post } = await getPost(slug);

  if (!post) notFound();

  return <Post post={post} />;
};

export default PostPage;
```

### React（記述ルール）

記述ルール

- React の内側と外側
- コンポーネントごとに役割を明確化する
- JSX 構文内でのタグの使い方や props の渡し方に注意する
- 関数のトップレベルで命令的な書き方は NG
- hooks はトップレベル、かつ return 文の前に書く
- 早期リターンのテクニック
- JSX の書き方を学ぶ
  - 文字列はクォーテーション、それ以外は{}
  - boolean は true の時のみ省略できる
  - props にはコンポーネントも渡せる
- JSX 部分はシンプルを心がける
- DOM を操作するメソッド・プロパティは使わない
- useEffect はなるべく使わない

### TypeScript（絶対パス指定）

絶対パス指定

- インポート文を書くときに@で src 配下を参照できるようにする

```json
"compilerOptions": {
  "baseUrl": ".",
  "paths": {
    "@/*": ["src/*"]
  },
  .
  .
  .
}
```

### TailwindCSS（カラーシステム、状態に応じたユーティリティの付与）

カラーシステム

- Radix UI のカラー システムを Tailwind CSS に導入（tailwindcss-radix-colors）
  - Radix UI は、通常の状態の場合は「ステップ 3」、ホバー状態の場合は「ステップ 4」、押された状態の場合は「ステップ 5」など、各カラー スケールに意味を割り当てることで、これらの状態を処理できるように適切に設計されている

```ts
module.exports = {
  // ...
  plugins: [require("tailwindcss-radix-colors")],
};
```

状態に応じたユーティリティの付与

- Tailwind Variants を導入する（tailwind-variants）
  - tv()を使用してクラス名の生成
  - 内部的には tailwind-merge で処理されているので、TailwindCSS におけるクラス名の非効率な重複を避けられる
  - Variants を用いることで同一のコンポーネントに対し、複数のバージョンのスタイルを容易に追加

```ts
const button = tv({
  base: "text-white p-4",
  variants: {
    color: {
      primary: "bg-blue-500",
      secondary: "bg-red-500",
    },
    size: {
      small: "text-sm p-2",
      base: "text-base p-4",
      large: "text-lg p-6",
    },
  },
});

button({ color: "primary", size: "small" });
// => "text-white bg-blue-500 text-sm p-2"

button({ color: "secondary", size: "large" });
// => "text-white bg-blue-500 text-base p-6"
```

### ESLint、Prettier（設定、パッケージ導入）

設定

- npm scripts 追加

```json
{
  "scripts": {
    "lint": "conc -g \"yarn:lint:*\"",
    "lint:eslint": "next lint",
    "lint:prettier": "prettier --check .",
    "fix": "yarn fix:eslint && yarn fix:prettier",
    "fix:eslint": "next lint --fix",
    "fix:prettier": "prettier --write ."
  }
}
```

- VSCode 設定で ESLint と Prettier の自動整形が動作するようにする

```json
{
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true
}
```

- VSCode 拡張設定で code-spell-checker を導入するようにする

```json
{
  "recommendations": ["streetsidesoftware.code-spell-checker"]
}
```

- 対象ファイルのみデフォルトエクスポートするように設定を追加

```js
const srcTsFiles = ["src/**/*.ts", "src/**/*.tsx"];
const nextConventionFiles = [
  "src/app/**/default.tsx",
  "src/app/**/error.tsx",
  "src/app/**/layout.tsx",
  "src/app/**/loading.tsx",
  "src/app/**/not-found.tsx",
  "src/app/**/page.tsx",
  "src/app/**/route.tsx",
  "src/app/**/template.tsx",
];

module.exports = {
  overrides: [
    {
      files: srcTsFiles,
      rules: { "import/no-default-export": "error" },
      excludedFiles: nextConventionFiles,
    },
  ],
};
```

ESLint との競合ルール調整用パッケージ導入（eslint-config-prettier）

- ESLint 設定ファイルに追加

```js
module.exports = {
  extends: ["prettier"],
};
```

インポートをソートするパッケージを導入（@ianvs/prettier-plugin-sort-imports）

- Prettier 設定ファイルに追加

```js
module.exports = {
  printWidth: 100,

  plugins: ["@ianvs/prettier-plugin-sort-imports"],
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "^@vercel/(.*)$",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^@/(.*)$",
    "",
    "^[./]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.1.6",
};
```

未使用のインポートを見つけて削除するパッケージを導入（eslint-plugin-unused-imports）

- ESLint 設定ファイルに追加

```js
module.exports = {
  plugins: ["unused-imports"],
  rules: {
    "unused-imports/no-unused-imports": ["error"],
  },
};
```

オブジェクトおよび TypeScript タイプのキーをアルファベット順にソートするパッケージを導入（eslint-plugin-sort-keys-custom-order）

- ESLint 設定ファイルに追加

```js
const srcTsFiles = ["src/**/*.ts", "src/**/*.tsx"];
const orderedKeys = ["children", "className"];

module.exports = {
  plugins: ["sort-keys-custom-order"],
  overrides: [
    {
      files: srcTsFiles,
      rules: {
        "sort-keys-custom-order/type-keys": ["error", { orderedKeys }],
        "sort-keys-custom-order/object-keys": ["error", { orderedKeys }],
      },
    },
  ],
};
```

インラインでタイプをインストールする設定を追加（@typescript-eslint/eslint-plugin、@typescript-eslint/parser）

- ESLint 設定ファイルに追加

```js
module.exports = {
  extends: ["plugin:@typescript-eslint/recommended"],
  rules: {
    "@typescript-eslint/consistent-type-imports": ["error", { fixStyle: "inline-type-imports" }],
  },
};
```

TailwindCSS を使う際に導入したプラグイン（eslint-plugin-tailwindcss、prettier-plugin-tailwindcss）

- prettier-plugin-tailwindcss
  - class に渡された文字列から TailwindCSS クラスを含む属性を探して、推奨されるクラスの順序に従ってそれらを自動的に並べ替える

```ts
module.exports = {
  ...
  plugins: [require('prettier-plugin-tailwindcss')],
}
```

- eslint-plugin-tailwindcss
  - デフォルトの設定では以下のように class のコンフリクト、tailwind にサポートされていないクラスの使用、冗長な記述などを指摘

```ts
module.exports = {
  extends: [
    ...
    'plugin:tailwindcss/recommended',
  ],
  ...
  plugins: ['tailwindcss'],
  ...
}
```

### husky、lint-staged（設定）

- lint を強制しないと、忘れたり面倒になって適当なコードのまま commit, push してしまうことがあった
- 複数人で開発している場合はルールを共有するためにも有効

```json
{
  "scripts": {
    "prepare": "husky install"
  }
}
```

※scripts の prepare は特殊で、yarn install の前に自動で実行

- .ts .tsx ファイルにコミット前に eslint, prettier を実行

```json
{
  "lint-staged": {
    "*.{ts,tsx}": "yarn fix"
  }
}
```

### Supabase（リクエストとレスポンスの型安全性の確保）

リクエストとレスポンスの型安全性の確保（supabase-js v2 から利用できるようになった、型を自動生成する機能）

- supabase login
  - npx supabase login で、アクセストークンを入力し、ログイン
  - この時、アクセストークンの取得方法は以下のように案内がある

```
You can generate an access token from https://app.supabase.com/account/tokens
```

- supabase link

  - supabase link --project-ref <プロジェクトの Reference ID> で、プロジェクトをリンク

- 型情報の生成
  - 下記のコマンドで、リンクしたプロジェクトの Schema から TS 用の型を生成

```
supabase gen types typescript --linked > schema.ts
```

- supabase-js v2 で、生成された型を使用
  - createClient の型引数に、生成された型を指定するだけで、各クエリが正確に型付け

```ts
import { createClient } from "@supabase/supabase-js";

import type { Database } from "./schema";

export const supabase = createClient<Database>("SAMPLE_SUPABASE_URL", "SAMPLE_SUPABASE_ANON_KEY");

// from()内で入力補完が効き、dataは正確に型付けされている
const { data } = await supabase.from("users").select("*");

// insertやupdateに渡すデータも型付けされている
await supabase.from("users").insert({ name: "sample", age: 10 });
```

## 各コンポーネント作成、機能カスタマイズなど

- ActiveLink 機能の作成（next/link をカスタマイズ）
- コンポーネントの Props 設計（React.ComponentProps）
- ログインフォーム、プロフィールフォームの作成（react-hook-form、zod）
- ダイアログの作成（HeadlessUI）
- テキストエリアの作成（react-textarea-autosize）
- トーストの作成（react-hot-toast）

### ActiveLink 機能の作成（next/link をカスタマイズ）

- next/navigation の useRouter()を使用して、受け取ったリンクが URL と一致しているか比較する

```tsx
import type { FC, ReactElement } from "react";
import Link, { type LinkProps } from "next/link";
import { useRouter } from "next/router";

type Props = Omit<LinkProps, "children"> & {
  children: (isActive: boolean) => ReactElement;
};

export const ActiveLink: FC<Props> = ({ children, ...linkProps }) => {
  const { pathname } = useRouter();
  return <Link {...linkProps}>{children(pathname === linkProps.href)}</Link>;
};
```

### コンポーネントの Props 設計（React.ComponentProps）

- 一つ一つのプロパティを定義した場合

```tsx
type Props = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};
export const Input = ({ value, onChange }: Props) => <input value={value} onChange={onChange} />;
```

- ComponentProps を利用した場合

```tsx
type Props = React.ComponentProps<"input">;
export const Input = (props: Props) => <input {...props} />;
```

※React が提供している Element が持つ Props を全てうけとれるようになる

### ログインフォーム、プロフィールフォームの作成（react-hook-form、zod）

パスワードバリデーション（.refine または.superRefine を使う）

- 現在のパスワードと新しいパスワードが一致しているか
- 新しいパスワードと確認用のパスワードが一致しているか

```tsx
const schema = z
  .object({
    currentPassword: z.string().min(1, "パスワードを入力してください"),
    newPassword: z
      .string()
      .min(8, "パスワードは8文字以上で入力してください")
      .regex(
        /^(?=.*?[a-z])(?=.*?\d)[a-z\d]{8,100}$/i,
        "パスワードは半角英数字混合で入力してください"
      ),
    newPasswordConfirm: z.string().min(1, "確認用のパスワードを入力してください"),
  })
  .superRefine(({ currentPassword, newPassword, newPasswordConfirm }, ctx) => {
    if (newPassword !== newPasswordConfirm) {
      ctx.addIssue({
        path: ["newPasswordConfirm"],
        code: "custom",
        message: "パスワードが一致しません",
      });
    }
    if (currentPassword === newPassword) {
      ctx.addIssue({
        path: ["newPassword"],
        code: "custom",
        message: "現在のパスワードと同じです",
      });
    }
  });
```

### ダイアログの作成（HeadlessUI）

行われる処理

- Open dialog ボタンがクリックされ、openModal 関数が実行される
- isOpen の state が true となる
- Transition コンポーネントの show が true となるので Dialog が表示される
- closeModal が関数が実行されると Dialog が閉じる

```tsx
import { Fragment, useRef, type FC, type ReactNode } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button";

type MenuDialogProps = {
  children: ReactNode;
  onClose: () => void;
  show: boolean;
};

export const MenuDialog: FC<MenuDialogProps> = (props) => {
  const { children, onClose, show } = props;
  const buttonRef = useRef(null);

  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        static
        open={show}
        onClose={onClose}
        initialFocus={buttonRef}
        className="sm:fixed sm:inset-0 sm:z-10 sm:overflow-y-auto"
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 opacity-40" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          <div className="fixed bottom-0 w-full sm:static sm:inline-block sm:max-w-md sm:align-middle">
            <Transition.Child
              as={Fragment}
              enter="transform ease-in-out duration-300 sm:ease-out"
              enterFrom="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
              enterTo="translate-y-0 sm:opacity-100 sm:scale-100"
              leave="transform ease-in-out duration-200 sm:ease-in"
              leaveFrom="translate-y-0 sm:opacity-100 sm:scale-100"
              leaveTo="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
            >
              <div className="relative rounded-t-3xl bg-indigo-2 px-6 pb-12 pt-20 dark:bg-indigodark-2 sm:rounded-2xl">
                <Button
                  ref={buttonRef}
                  variant="ghost"
                  className="absolute right-5 top-4 p-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </Button>
                <div>{children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
```

Dialog の構成

- Dialog は true または false の state を持っており、open が true のときにレンダリングされる
- Dialog の onClose は、Dialog.Panel の外をクリックすると open を false に変更し、Dialog が閉じる
- Dialog.Panel の外をクリックすると close が発火される
- Dialog.Title は、title を表示しているエリアであることを明示的に表示してくれる

Dialog 表示時の背景の表示

- Dialog 表示時に背景を薄暗くするための設定

```tsx
<div className="bg-black fixed inset-0 bg-opacity-25" />
```

Transition

- Transition で Dialog を囲うことで、Animation を付ける
- Dialog の state は、Transition の show の state に依存するため、Transition の show が true なら、Dialog が表示されることになる

### テキストエリアの作成（react-textarea-autosize）

- textarea を自動で調整

```tsx
"use client";

import { useRef } from "react";

import ReactTextareaAutosize from "react-textarea-autosize";

import { format_hhmma } from "@/lib/memo/date";
import { type NoteWithUserType } from "@/lib/memo/type";
import { useUpdateNote } from "@/lib/memo/useUpdateNote";

export const NoteEditor = (props: NoteWithUserType) => {
  const { note } = props;
  const ref = useRef<HTMLTextAreaElement>(null);
  const { handleBlur, handleChange, isUpdatingNote } = useUpdateNote({ note });

  return (
    <ReactTextareaAutosize
      ref={ref}
      id="memo"
      className="w-full resize-none border-none bg-transparent text-lg leading-loose focus:ring-0"
      defaultValue={note.content ?? ""}
      onChange={handleChange}
      onBlur={handleBlur}
      placeholder="メモを入力する"
      autoComplete="off"
      minRows={16}
      autoFocus={note.content === ""}
    />
  );
};
```

### トーストの作成（react-hot-toast）

- react-hot-toast の API を使用するための設定

```tsx
"use client";

import { Toaster } from "react-hot-toast";

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      {children}
      <Toaster
        toastOptions={{
          className: "!rounded-full !py-1 !px-2.5 !text-sm font-bold",
          duration: 2500,
        }}
      />
    </>
  );
};
```

- 非同期処理パターンの API 活用方法

```tsx
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const fakeApi = () => {
	return new Promise((resolve, _reject) => {
		setTimeout(() => {
			resolve("resolve");
		}, 1000);
	});
};

const usePromiseToast = () => {
	const [isLoading, setIsLoading] = useState(false);

	const promiseToast = useCallback(async (promise, msgs) => {
		setIsLoading(true);
		try {
			await toast.promise(promise, {
				loading: "ローディング中",
				success: "成功",
				error: "エラー",
				...(msgs ? msgs : {})
			});
		} catch (error) {
			console.error(error);
		}
		setIsLoading(false);
	};

	return { promiseToast, isLoading };
}, [isLoading]);

const Test = () => {
	const { promiseToast, isLoading } = usePromiseToast();

	const handleClick = async () => {
		await promiseToast(fakeApi(), {
			loading: "loading"
		});
	};

	return (
		<div>
			<button onClick={handleClick} disabled={isLoading}>
				{isLoading ? "ローディング中" : "非同期処理を行う"}
			</button>
			<Toaster />
		</div>
	);
};
```

## 各ロジック作成

- データフェッチング（Supabase、Next.js）
- ローディングとエラー時の UI（Next.js）
- プロフィール画像の登録（Supabase、Next.js）
- 削除後メモの復元（Supabase、Next.js）
- 外部認証サービスの構築・実装（Supabase、Next.js、GCP）
- コンテンツの自動保存、自動検索（React18 useTransition）
- ダークモード対応（next-theme）

### データフェッチング（Supabase、Next.js）

- Server Component 内で行う

  - データベースなどバックエンドのリソースに直接アクセスできる
  - アクセストークンなどの機密情報をクライアントに露出しない
  - データの取得とレンダリングを同一環境下で行うのでクライアントとサーバーの通信と、クライアント上のメインスレッドの作業を削減できる
  - 複数のデータフェッチングを 1 つのリクエストで行うことができる
  - データソースにより近い場所でデータを取得することで、レイテンシを削減できる

- キャッシュ戦略
  - キャッシュの生存期間は next.revalidate を指定することで設定
  - revalidate は ルート単位の設定ができる
  - ルート単位で設定するには page または layout ファイルで記述

```tsx
export const revalidate = 60;
```

メモ一覧 API

- 新着のメモの一覧を取得しているので、データの更新が頻繁に行われる可能性がある
- データのキャシュは行わないようにして、毎回リクエストを行うように設定する
- 実行するたびに新しいデータを取得するようにするには、cache: "no-store" を設定する

メモ詳細 API

- メモの本文は、更新頻度が高くないと想定できるので、一定期間キャッシュしておく

メモ作成 API

- メモ作成後のトップページ遷移でキャッシュを無効にする
  - 記事の作成後、トップページに遷移したときに作成した記事が表示されない問題があった
  - router.push による画面遷移が Soft Navigation であるため、遷移先のキャッシュが存在する場合再利用され、サーバーへの新たなリクエストが発生しなかった
  - トップページのキャッシュが存在するため、キャッシュを無効にするためには router.refresh を呼び出す

### ローディングとエラー時の UI（Next.js）

ローディング

- Next.js 13 では App Router 内の loading.tsx という特殊なファイルがローディング UI を表示する役割
- サーバーでデータを取得している最中（= サーバーコンポーネントの Promise が解決するまで）に表示され、レンダリングが完了すると新しいコンテンツを表示
- 同じディレクトリ内の page.tsx をラップするように配置するので、ヘッダーなどのレイアウトは即座に表示
- Suspense における fallback と同じ

```tsx
<html lang="ja">
  <head />
  <body>
    <Provider>
      <Header />
      <Main>
        <Suspense fallback={<Loading />}>
          {/* children には page.tsx のコンテンツが挿入される */}
          {children}
        </Suspense>
      </Main>
      <Footer />
    </Provider>
  </body>
</html>
```

エラーハンドリング

- サーバーコンポーネント内で例外が throw された場合、error.tsx の内容が表示
- 同じディレクトリ内にある page.tsx ファイルを Error Boundary でラップ

```tsx
<html lang="ja">
  <head />
  <body>
    <Provider>
      <Header />
      <Main>
        <ErrorBoundary fallback={<Error />}>
          {/* children には page.tsx のコンテンツが挿入される */}
          {children}
        </Suspense>
      </Main>
      <Footer />
    </Provider>
  </body>
</html>
```

### プロフィール画像の登録（Supabase、Next.js）

- Supabase Storage RLS
  - ファイルへの読み取りアクセスを許可するには、RLS ポリシーでユーザーにオブジェクトテーブルの SELECT を許可
  - 新しいオブジェクトをアップロードするには、RLS ポリシーでユーザーにオブジェクトテーブルへの INSERT などのアクセスを許可

### 削除後メモの復元（Supabase、Next.js）

- トースト内に削除メモのデータを持たせる
  - メモ帳は一覧ページから削除されることが多いため、トーストに一時的に削除情報をもたせる
  - 削除時はダイアログ無しでワンクリックで削除可能
  - 間違えて削除してしまった場合は復元ボタンを押すことで巻き戻し可能

### 外部認証サービスの構築・実装（Supabase、Next.js、GCP）

ソーシャルプロバイダー(Google)による認証

- GCP でプロジェクトを作成
  - Google 認証を行うにあたり Google OAuth アプリケーションの設定を行い、アプリケーションの資格情報を Supabase のダッシュボードに追加する
- Google OAuth キーを Supabase プロジェクトに追加
  - Supabase プロジェクトの Client ID と Client Secret に設定する Google OAuth キーを作成
- OAuth 同意画面の設定
  - 新しいプロジェクトのダッシュボードを開き、API とサービスの OAuth 同意画面を選択
- Google 資格情報を作成
  - Redirect URL を承認済みのリダイレクト URL に追加
  - クライアント ID とクライアントシークレットをコピー
- Google OAuth キーを Supabase プロジェクトに設定
  - Google enabled をオンにし、コピーしたクライアント ID とクライアントシークレットを個々の場所にペースト

### コンテンツの自動保存、自動検索（React18 useTransition）

- useTransition の遅延タイミングを活用して、スピナーやプレースホルダーを表示し、非同期操作が完了したらコンテンツを表示
  - startTransition を使って setState で値を更新
  - 画面表示は変わらず(ペンディング状態)、裏側でレンダリングが実行(この間ユーザーは、画面操作が可能)
  - 画面レンダリングが完了した時点で画面が切り替わる
- startTransition を使うことでで UI ブロッキングを防ぐ
  - 画面遷移中にユーザーが別操作で遷移を中断することが可能
  - 遷移のたびに、全体のローディングを表示すると UX を下げるため

```tsx
function TabContainer() {
  const [isPending, startTransition] = useTransition();
  const [tab, setTab] = useState("about");

  function selectTab(nextTab) {
    startTransition(() => {
      setTab(nextTab);
    });
  }
}
```

### ダークモード対応（next-theme）

- ThemeProvider をインポートして attribute には class を指定

```tsx
"use client";

import { type FC, type PropsWithChildren } from "react";

import { ThemeProvider } from "next-themes";

export const ThemeProviders: FC<PropsWithChildren> = ({ children }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      {children}
    </ThemeProvider>
  );
};
```

- body タグにスタイルを設定

```tsx
import { ThemeProviders } from "@/app/_component/Provider/ThemeProviders";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-indigo-2 dark:bg-indigodark-2 md:mr-0 md:flex md:justify-center">
        <ThemeProviders>
          <main>{children}</main>
        </ThemeProviders>{" "}
      </body>
    </html>
  );
};

export default RootLayout;
```

- useTheme フックでテーマ情報を受け取る

```tsx
"use client";

import { useEffect, useMemo, useState } from "react";

import { useTheme as useNextTheme } from "next-themes";

type ExtendUseThemeType = ReturnType<typeof useNextTheme> & {
  resolvedTheme: "light" | "dark";
  theme: "system" | "light" | "dark";
};

export const useTheme = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { setTheme: handleTheme, theme: currentTheme } = useNextTheme() as ExtendUseThemeType;
  const themes = useMemo(() => {
    return [
      { id: "system", label: "端末の設定に合わせる" },
      { id: "light", label: "ライト" },
      { id: "dark", label: "ダーク" },
    ] as const;
  }, []);
  useEffect(() => {
    return setIsMounted(true);
  }, []);

  return { currentTheme, handleTheme, isMounted, themes };
};
```
