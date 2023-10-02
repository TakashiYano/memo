"use client";

import { Anchor } from "@/component/Button/Anchor";

const NotFound = () => {
  return (
    <div className="space-y-4 px-4">
      <div className="text-center text-5xl font-bold">404</div>
      <div className="text-center text-xl">
        このページはすでに削除されているか、URLが間違っている可能性があります。
      </div>
      <Anchor href="/" variant="ui" className="mx-auto w-1/4 p-4">
        トップへ戻る
      </Anchor>
    </div>
  );
};

export default NotFound;
