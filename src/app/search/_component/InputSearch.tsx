"use client";

import {
  useCallback,
  useRef,
  useState,
  useTransition,
  type ChangeEventHandler,
  type ComponentProps,
  type FC,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon, MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

import { Anchor } from "@/component/Button/Anchor";
import { Button } from "@/component/Button/Button";
import { ICON_SIZE } from "@/lib/const/constants";

type Props = ComponentProps<"input">;

export const InputSearch: FC<Props> = (props) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();

  const debounced = useDebouncedCallback((value: string) => {
    try {
      startTransition(() => {
        if (!value) {
          router.push("/search");
        } else {
          router.push(`/search?q=${value}`);
        }
      });
    } catch (error) {
      toast.error("エラーが発生したため保存に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, 1000);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = e.target.value;
      setKeyword(value);

      return debounced(e.currentTarget.value);
    },
    [debounced]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/search?q=${keyword}`);
    },
    [router, keyword]
  );

  const handleClose = useCallback(() => {
    setKeyword("");
    router.push("/search");
  }, [router]);

  return (
    <section className="mx-auto flex items-center justify-between px-3 sm:px-4">
      <Anchor href="/" variant="ghost" className={ICON_SIZE}>
        <ChevronLeftIcon className="h-5 w-5" />
      </Anchor>
      <form className="relative w-full" onSubmit={handleSubmit}>
        <input
          id="search"
          className="m-0 my-auto h-10 w-full rounded-full border-none bg-indigo-3 pl-12 focus:ring-2 focus:ring-indigo-11 dark:bg-indigodark-3 dark:focus:bg-transparent"
          type="text"
          ref={inputRef}
          {...props}
          value={keyword}
          placeholder="検索"
          onChange={handleChange}
          autoFocus
        />
        <span className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2">
          <MagnifyingGlassIcon className="h-5 w-5 text-indigo-11 dark:text-indigodark-11" />
        </span>

        {isPending && (
          <div className="absolute right-4 top-2.5 h-5 w-5 animate-spin rounded-full border-4 border-indigo-6 border-t-transparent dark:border-indigodark-6" />
        )}
        {keyword && !isPending && (
          <Button
            key="delete"
            ref={buttonRef}
            className="absolute right-4 top-2.5 h-5 w-5"
            onClick={handleClose}
          >
            <XMarkIcon className="h-5 w-5" />
          </Button>
        )}
      </form>
    </section>
  );
};
