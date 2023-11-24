"use client";

import { type FC } from "react";

import { Toaster } from "react-hot-toast";

export const ToastProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
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
