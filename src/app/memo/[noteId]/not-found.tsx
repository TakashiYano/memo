"use client";

import { Anchor } from "@/component/Button";

const NotFound = () => {
  return (
    <div className="space-y-4 p-4">
      <div className="text-center text-5xl font-bold">404</div>
      <div className="text-center text-xl">
        このページはすでに削除されているか、URLが間違っている可能性があります。
      </div>
      <Anchor href="/" variant="solid" className="mx-auto w-1/3 px-4 py-2">
        トップへ戻る
      </Anchor>
    </div>
  );
};

export default NotFound;
