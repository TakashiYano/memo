"use client";

import { useEffect } from "react";

import { Button } from "@/component/Button";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center space-y-4 px-4">
      <h2 className="text-center text-xl">
        エラーが発生しました。
        <br />
        更新してもうまくいかない場合はお問い合わせください。
      </h2>
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
