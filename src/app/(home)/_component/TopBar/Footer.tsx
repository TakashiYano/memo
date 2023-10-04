"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { Avatar } from "@/component/Avatar/Avatar";
import { Button } from "@/component/Button/Button";
import { useCreateNote } from "@/lib/memo/useCreateNote";
import { type ProfileAllProps } from "@/lib/user/type";

const footer = tv({
  slots: {
    base: "fixed bottom-0 w-full bg-indigo-2 py-2 dark:bg-indigodark-2 md:hidden",
    image: "inline-block h-5 w-5",
    li: "w-1/3",
    text: "mt-1",
    ul: "flex justify-between text-center items-center text-xs",
  },
});

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

export const Footer = (props: ProfileAllProps) => {
  const { profile } = props;
  const { base, image, li, text, ul } = footer();
  const { handleCreateMemo, isPending } = useCreateNote({ profile });
  const currentPath = usePathname();

  return (
    <footer className={base()}>
      <nav>
        <ul className={ul()}>
          <li className={li()}>
            <NavigationLink href="/" currentPath={currentPath}>
              <MagnifyingGlassIcon className={image()} />
              <p className={text()}>メモを検索</p>
            </NavigationLink>
          </li>
          <li className={li()}>
            <Button
              type="button"
              key="write memo"
              variant="solid"
              onClick={handleCreateMemo}
              disabled={isPending}
              className="w-full p-2 text-indigo-12 hover:bg-indigo-3 dark:text-indigodark-12 dark:hover:bg-indigodark-3"
            >
              <PencilSquareIcon className="h-5 w-5" />
              <p className={text()}>メモを書く</p>
            </Button>
          </li>
          <li className={li()}>
            <NavigationLink href="/setting/account" currentPath={currentPath}>
              <Avatar
                noDialog
                src={profile.avatar_url ?? ""}
                alt={profile.user_name}
                width={96}
                height={96}
                className={image({ class: "overflow-hidden rounded-full" })}
              />
              <p className={text()}>マイMemo</p>
            </NavigationLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
