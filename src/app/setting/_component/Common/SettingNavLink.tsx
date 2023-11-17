"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SettingNavLinkProps = {
  children: React.ReactNode;
  href: string;
};

export const NavigationLink = (props: SettingNavLinkProps) => {
  const { children, href } = props;
  const currentPath = usePathname();

  return (
    <Link
      href={href}
      className={`block py-2.5 ${
        currentPath === href
          ? " border-b-[2px] border-indigo-6 font-bold text-indigo-11 dark:border-indigodark-6 dark:text-indigodark-11"
          : "text-indigo-12 dark:text-indigodark-12"
      }`}
    >
      {children}
    </Link>
  );
};
