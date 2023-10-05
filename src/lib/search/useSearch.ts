"use client";

import {
  useCallback,
  useRef,
  useState,
  useTransition,
  type ChangeEventHandler,
  type FormEvent,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useDebouncedCallback } from "use-debounce";

export const useSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [keyword, setKeyword] = useState(q || "");
  const [isPending, startTransition] = useTransition();

  const debounced = useDebouncedCallback((value: string) => {
    if (!value) {
      router.push("/search");
    } else {
      router.push(`/search?q=${value}`);
    }
  }, 1000);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = e.target.value;
      setKeyword(value);
      startTransition(() => {
        router.refresh();
      });

      return debounced(value);
    },
    [debounced, router]
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

  return { buttonRef, handleChange, handleClose, handleSubmit, inputRef, isPending, keyword };
};
