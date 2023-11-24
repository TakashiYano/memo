"use client";

import { type FC } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { tv } from "tailwind-variants";

const link = tv({
  base: "block",
});

type ActiveLinkProps = {
  children: React.ReactNode;
  href: string;
};

export const ActiveLink: FC<ActiveLinkProps> = (props) => {
  const { children, href } = props;
  const currentPath = usePathname();
  const classes = link({
    class: `${
      currentPath === href
        ? " text-indigo-11 dark:text-indigodark-11"
        : "text-indigo-12 dark:text-indigodark-12"
    }`,
  });

  return (
    <Link href={href} className={classes}>
      {children}
    </Link>
  );
};
