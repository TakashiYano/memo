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
