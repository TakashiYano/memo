"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NavigationLink = ({
  children,
  currentPath,
  href,
}: {
  children: React.ReactNode;
  currentPath: string;
  href: string;
}) => {
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

export const SettingNav = () => {
  const currentPath = usePathname();

  return (
    <div className="pt-4">
      <nav className="border-b-[1px] border-indigo-6 dark:border-indigodark-6">
        <ul className="flex">
          <li className="w-1/2 text-center text-[16px] ">
            <NavigationLink href="/setting/account" currentPath={currentPath}>
              アカウント
            </NavigationLink>
          </li>
          <li className="w-1/2 text-center text-[16px] ">
            <NavigationLink href="/setting/profile" currentPath={currentPath}>
              プロフィール
            </NavigationLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
