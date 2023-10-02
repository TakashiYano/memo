"use client";

import { useEffect } from "react";

import { Button } from "@/component/Button/Button";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="space-y-4 px-4">
      <div className="text-center text-xl">
        エラーが発生しました。
        <br className="hidden sm:block" />
        更新してもうまくいかない場合はお問い合わせください。
      </div>
      <Button
        className="mx-auto p-4"
        variant="ui"
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
