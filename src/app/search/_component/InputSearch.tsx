"use client";

import { type ComponentProps } from "react";

import { ChevronLeftIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { Anchor } from "@/component/Button/Anchor";
import { Button } from "@/component/Button/Button";
import { useSearch } from "@/lib/search/useSearch";

type InputSearchProps = ComponentProps<"input">;

const inputSearch = tv({
  slots: {
    base: "mx-auto flex items-center justify-between px-3 sm:px-4",
    container: "relative w-full",
    icon: "h-5 w-5",
    input:
      "m-0 my-auto h-10 w-full rounded-full border-none bg-indigo-3 pl-12 focus:ring-2 focus:ring-indigo-11 dark:bg-indigodark-3 dark:focus:bg-transparent",
    span: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-11 dark:text-indigodark-11",
    spinner:
      "absolute right-4 top-2.5 h-5 w-5 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6",
  },
});

export const InputSearch = (props: InputSearchProps) => {
  const { base, container, icon, input, span, spinner } = inputSearch();
  const { buttonRef, handleChange, handleClose, handleSubmit, inputRef, isPending, keyword } =
    useSearch();

  return (
    <div className={base()}>
      <div>
        <Anchor href="/" variant="ghost" className="h-10 w-10">
          <ChevronLeftIcon className={icon()} />
        </Anchor>

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
          />
          <span className={span()}>
            <MagnifyingGlassIcon className={icon()} />
          </span>

          {keyword && isPending && <div className={spinner()} />}

          {keyword && !isPending && (
            <Button
              key="delete"
              ref={buttonRef}
              className="absolute right-4 top-2.5 h-5 w-5"
              onClick={handleClose}
            >
              <XMarkIcon className={icon()} />
            </Button>
          )}
        </form>
      </div>
    </div>
  );
};
