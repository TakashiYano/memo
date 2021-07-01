import type { VFC } from "react";

export const Footer: VFC = () => {
  return (
    <footer className="bg-white dark:bg-gray-800">
      <small className="text-gray-800 dark:text-white" lang="en">
        @ 2021 memo
      </small>
    </footer>
  );
};
