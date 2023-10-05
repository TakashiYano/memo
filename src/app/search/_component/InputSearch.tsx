"use client";

import { type ComponentProps } from "react";

import { ChevronLeftIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { Anchor, Button } from "@/component/Button";
import { useSearch } from "@/lib/search/useSearch";

type InputSearchProps = ComponentProps<"input">;

const inputSearch = tv({
  slots: {
    base: "p-4 border-b border-indigo-6 dark:border-indigodark-6",
    container: "relative w-full",
    icon: "h-5 w-5",
    input:
      "bg-indigo-3 dark:bg-indigodark-3 w-full h-10 rounded-xl border-none py-2 pr-4 pl-12 placeholder:font-bold",
    span: "absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-indigo-11 dark:text-indigodark-11",
    spinner:
      "absolute right-4 top-2.5 h-5 w-5 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6",
    wrapper: "flex items-center gap-x-4",
  },
});

export const InputSearch = (props: InputSearchProps) => {
  const { base, container, icon, input, span, spinner, wrapper } = inputSearch();
  const { buttonRef, handleChange, handleClose, handleSubmit, inputRef, isPending, keyword } =
    useSearch();

  return (
    <div className={base()}>
      <div className={wrapper()}>
        <Anchor href="/" className="hover:text-indigo-11 dark:hover:text-indigodark-11">
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
            autoComplete="off"
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
