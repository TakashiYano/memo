# Memo

## 概要

MemoApp の開発

## 使用技術

- [React](https://ja.reactjs.org/)
  - Facebook 製 UI ライブラリ。
- [Next.js](https://nextjs.org/)
  - React のフレームワーク。純粋な React だけで構築すると面倒な部分を簡単にしてくれる。今後、頻繁に使われるようになる技術と考えられる。
- [TypeScript](https://www.typescriptlang.org/)
  - 型を使うことでバグを防いだり、ドキュメント代わりになったり、チーム開発において便利。
- [Tailwind CSS](https://tailwindcss.com/)
  - ユーティリティファーストな CSS フレームワークでスタイリングに非常に便利。
- [SWR](https://swr.now.sh/)
  - React Hooks ベースのデータフェッチライブラリ。
- [ESLint](https://eslint.org/)
  - コードを分析し問題点を指摘してくれるツール。これがあることでメンバー同士のコード差異が少なくなったり、独自ルールを追加して書き方を統一できる。
- [Prettier](https://prettier.io/)
  - コードフォーマッター。改行やクォーテーションなどを統一できる。ESLint とあわせて使うのが一般的で、ESLint だけでは実現できない部分をカバーする。
- [Jest](https://jestjs.io/ja/)
  - Facebook 製の JavaScript のテスティングフレームワークです。テストに関する様々な機能を提供しており、ドキュメントも豊富かつ実績もある。
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
  - React "Components"をテストするためのもの。[Jest 公式](https://jestjs.io/docs/ja/tutorial-react#dom-%E3%81%AE%E3%83%86%E3%82%B9%E3%83%88)でもコンポーネントをテストしたい場合に使えるものだと言及されている。
- [Mock Service Worker](https://mswjs.io/)
  - サービスワーカーを利用して API モックを作れるライブラリ。フロントエンド駆動開発やテストに便利。
