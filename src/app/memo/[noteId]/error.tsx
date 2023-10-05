"use client";

import { useEffect } from "react";

import { Button } from "@/component/Button";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4 p-4">
      <div className="text-center text-xl">
        エラーが発生しました。
        <br className="hidden sm:block" />
        更新してもうまくいかない場合はお問い合わせください。
      </div>
      <Button
        className="mx-auto px-4 py-2"
        variant="solid"
        onClick={() => {
          return reset();
        }}
      >
        やり直す
      </Button>
    </div>
  );
};

export default Error;
