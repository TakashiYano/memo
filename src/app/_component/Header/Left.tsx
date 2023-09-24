"use client";

import { memo, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { ChevronLeftIcon, XMarkIcon } from "@heroicons/react/24/outline";

import { ICON_SIZE } from "@/app/_component/Header/constants";
import { Button } from "@/component/Button";

export type Left = {
  left?: "back" | "close" | "memo" | JSX.Element;
};

export const Left = memo<Left>((props) => {
  const router = useRouter();
  const handleClick = useCallback(() => {
    const prevPath = sessionStorage.getItem("prevPath");
    return prevPath ? router.back() : router.push("/");
  }, [router]);

  if (!props.left) {
    return <div className={ICON_SIZE} />;
  }
  if (props.left === "back" || props.left === "close") {
    return (
      <Button variant="ghost" className={ICON_SIZE} onClick={handleClick}>
        {props.left === "back" ? <ChevronLeftIcon className="h-5 w-5" /> : null}
        {props.left === "close" ? <XMarkIcon className="h-5 w-5" /> : null}
      </Button>
    );
  }
  if (props.left === "memo") {
    return (
      <Link href="/" legacyBehavior>
        <a className="text-xl font-bold">Memo</a>
      </Link>
    );
  }
  return props.left;
});

Left.displayName = "Left";
