"use client";

import { useCallback, type FC } from "react";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon } from "@heroicons/react/24/outline";

import { InputSearch } from "@/app/search/_component/InputSearch";
import { Button } from "@/component/Button/Button";
import { ICON_SIZE } from "@/lib/const/constants";

export type HeaderProps = { isHeaderNarrow?: boolean };

export const SearchHeader: FC<HeaderProps> = (props) => {
  const { isHeaderNarrow } = props;
  const router = useRouter();

  const handleClick = useCallback(() => {
    const prevPath = sessionStorage.getItem("prevPath");
    return prevPath ? router.back() : router.push("/");
  }, [router]);

  return (
    <header
      className={`mx-auto flex items-center justify-between px-3 sm:px-4 ${
        isHeaderNarrow ? "max-w-screen-sm" : "max-w-screen-lg"
      }`}
    >
      <Button variant="ghost" className={ICON_SIZE} onClick={handleClick}>
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>
      <InputSearch />
    </header>
  );
};
