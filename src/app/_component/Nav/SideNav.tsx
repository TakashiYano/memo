"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { MagnifyingGlassIcon, PencilSquareIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { Accordion } from "@/component/Accordion";
import { Avatar } from "@/component/Avatar";
import { Button } from "@/component/Button";
import { type Label } from "@/lib/label/type";
import { useCreateNote } from "@/lib/memo/useCreateNote";
import { type ProfileAllType } from "@/lib/profile/type";

const sideNav = tv({
  slots: {
    base: "sticky top-0 hidden self-start bg-indigo-2 p-5 dark:bg-indigodark-2 md:inline w-[210px] max-w-[210px]",
    body: "text-lg",
    icon: "w-5 h-5 inline-block",
    title: "text-xl font-bold text-indigo-12 dark:text-indigodark-12",
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
      className={`flex items-center gap-x-3 rounded-full p-2 hover:bg-indigo-3 dark:hover:bg-indigodark-3 ${
        currentPath === href
          ? " text-indigo-11 dark:text-indigodark-11"
          : "text-indigo-12 dark:text-indigodark-12"
      }`}
    >
      {children}
    </Link>
  );
};

type SideNavProps = ProfileAllType & { labels: Label[] };

export const SideNav = (props: SideNavProps) => {
  const { labels, profile } = props;
  const { base, body, icon, title } = sideNav();
  const currentPath = usePathname();
  const { handleCreateMemo, isCreatingNote } = useCreateNote({ profile });

  return (
    <div className={base()}>
      <nav>
        <ul className="space-y-2">
          <li className="mb-10">
            <h1 className={title()}>Memo</h1>
          </li>
          <li className="ml-1">
            <NavigationLink href="/" currentPath={currentPath}>
              <MagnifyingGlassIcon className={icon()} />
              <p className={body()}>メモを検索</p>
            </NavigationLink>
          </li>
          <li className="ml-1">
            <NavigationLink href="/setting/account" currentPath={currentPath}>
              <Avatar
                noDialog
                src={profile.avatar_url ?? ""}
                alt={profile.user_name}
                width={96}
                height={96}
                className="h-5 w-5 overflow-hidden rounded-full"
              />
              <p className={body()}>マイMemo</p>
            </NavigationLink>
          </li>
          <li className="ml-1">
            <Button
              type="button"
              key="write memo"
              variant="solid"
              onClick={handleCreateMemo}
              disabled={isCreatingNote}
              className="flex w-full items-center gap-x-3 p-2 text-indigo-12 dark:text-indigodark-12"
            >
              <PencilSquareIcon className="h-5 w-5" />
              <p className={body()}>メモを書く</p>
            </Button>
          </li>
          <li className="ml-1">
            <Accordion labels={labels} />
          </li>
        </ul>
      </nav>
    </div>
  );
};
