"use client";

import { useCallback, useState, type ChangeEventHandler, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { toast } from "react-hot-toast";
import { useDebouncedCallback } from "use-debounce";

export const useSearch = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  const [inputValue, setInputValue] = useState(q);
  const [isLoading, setIsLoading] = useState(false);

  const debounced = useDebouncedCallback((value: string) => {
    try {
      setIsLoading(false);

      if (!value) {
        router.push("/search");
      } else {
        router.push(`/search?q=${value}`);
      }
    } catch (error) {
      toast.error("エラーが発生したため保存に失敗しました。時間を空けてから再度お試しください。");
      console.error(error);
    }
  }, 1000);

  const handleChange = useCallback<ChangeEventHandler<HTMLInputElement>>(
    (e) => {
      const value = e.target.value;
      setInputValue(value);
      setIsLoading(true);

      return debounced(e.currentTarget.value);
    },
    [debounced]
  );

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      router.push(`/search?q=${inputValue}`);
    },
    [router, inputValue]
  );

  const handleClose = useCallback(() => {
    setInputValue("");
    router.push("/search");
  }, [router]);

  return {
    handleChange,
    handleClose,
    handleSubmit,
    inputValue,
    isLoading,
  };
};