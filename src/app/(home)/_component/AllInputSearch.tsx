"use client";

import { type ComponentProps } from "react";

import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { useSearch } from "@/lib/search/useSearch";

type InputSearchProps = ComponentProps<"input">;

const allInputSearch = tv({
  slots: {
    base: "py-4 border-b px-4 border-indigo-6 dark:border-indigodark-6",
    container: "relative w-full",
    icon: "h-5 w-5",
    input:
      "bg-indigo-3 dark:bg-indigodark-3 w-full h-10 rounded-xl border-none py-2 pr-4 pl-12 placeholder:font-bold",
    span: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-11 dark:text-indigodark-11",
    spinner:
      "absolute right-4 top-2.5 h-5 w-5 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6",
  },
});

export const AllInputSearch = (props: InputSearchProps) => {
  const { base, container, icon, input, span, spinner } = allInputSearch();
  const { handleChange, handleSubmit, inputRef, keyword } = useSearch();

  return (
    <div className={base()}>
      <form className={container()} onSubmit={handleSubmit}>
        <input
          id="search"
          className={input()}
          type="text"
          ref={inputRef}
          {...props}
          value={keyword}
          placeholder="検索"
          onChange={handleChange}
          autoFocus
          autoComplete="off"
        />
        <span className={span()}>
          <MagnifyingGlassIcon className={icon()} />
        </span>

        {keyword && <div className={spinner()} />}
      </form>
    </div>
  );
};
