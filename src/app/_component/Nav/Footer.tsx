import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { NavigationLink } from "@/app/_component/Part/FooterNavLink";
import { NoteWriteButton } from "@/app/_component/Part/NoteWriteButton";
import { Avatar } from "@/component/Avatar";
import { getProfile } from "@/lib/supabase/user";

const navigation = tv({
  slots: {
    base: "fixed bottom-0 w-full bg-indigo-2 dark:bg-indigodark-2 py-2 md:hidden",
    bodyWrapper: "space-y-1",
    icon: "w-5 h-5 inline-block",
    list: "w-full",
    listWrapper: "flex justify-between text-center items-center text-xs",
  },
});

export const Footer = async () => {
  const { base, bodyWrapper, icon, list, listWrapper } = navigation();
  const profile = await getProfile();
  if (!profile) {
    return null;
  }

  return (
    <footer className={base()}>
      <nav>
        <ul className={listWrapper()}>
          <li className={list()}>
            <NavigationLink href="/">
              <div className={bodyWrapper()}>
                <MagnifyingGlassIcon className={icon()} />
                <p>メモを検索</p>
              </div>
            </NavigationLink>
          </li>
          <li className={list()}>
            <NoteWriteButton
              profile={profile}
              className="p-2 hover:bg-indigo-3 dark:hover:bg-indigodark-3"
            />
          </li>
          <li className={list()}>
            <NavigationLink href="/setting/account">
              <div className={bodyWrapper()}>
                <Avatar
                  noDialog
                  src={profile.avatar_url ?? ""}
                  alt={profile.user_name}
                  width={96}
                  height={96}
                  className="inline-block h-5 w-5 overflow-hidden rounded-full"
                />
                <p>マイMemo</p>
              </div>
            </NavigationLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
