"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type NavigationLinkProps = {
  children: React.ReactNode;
  href: string;
};

export const NavigationLink = (props: NavigationLinkProps) => {
  const { children, href } = props;
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      className={`hover:text-indigo-11 dark:hover:text-indigodark-11 ${
        currentPath === href
          ? " text-indigo-11 dark:text-indigodark-11"
          : "text-indigo-12 dark:text-indigodark-12"
      }`}
    >
      {children}
    </Link>
  );
};
