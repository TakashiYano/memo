"use client";

import { useEffect } from "react";

import { Button } from "@/component/Button/Button";

const Error = ({ error, reset }: { error: Error; reset: () => void }) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <div className="mb-3 text-center text-xl font-bold">予期せぬエラーが発生しました。</div>
      <Button
        className="mx-auto p-2 text-xl"
        variant="solid"
        onClick={() => {
          return reset();
        }}
      >
        Try again
      </Button>
    </div>
  );
};

export default Error;
