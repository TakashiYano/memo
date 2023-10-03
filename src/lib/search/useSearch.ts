"use client";

import {
  useCallback,
  useRef,
  useState,
  useTransition,
  type ChangeEventHandler,
  type FormEvent,
} from "react";
import { useRouter } from "next/navigation";

import { toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

export const useSearch = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [keyword, setKeyword] = useState("");
  const [isPending, startTransition] = useTransition();

  const debounced = useDebouncedCallback((value: string) => {
    try {
      if (!value) {
        router.push("/search");
      } else {
        router.push(`/search?q=${value}`);
      }
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      toast.error("エラーが発生したため検索に失敗しました。時間を空けてから再度お試しください。");
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
      startTransition(() => {
        router.refresh();
      });
    },
    [router, keyword]
  );

  const handleClose = useCallback(() => {
    setKeyword("");
    router.push("/search");
    startTransition(() => {
      router.refresh();
    });
  }, [router]);

  return { buttonRef, handleChange, handleClose, handleSubmit, inputRef, isPending, keyword };
};
