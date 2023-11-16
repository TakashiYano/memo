import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { NavigationLink } from "@/app/_component/Part/FooterNavLink";
import { NoteWriteButton } from "@/app/_component/Part/NoteWriteButton";
import { Avatar } from "@/component/Avatar";
import { getProfile } from "@/lib/supabase/user";

const navigation = tv({
  slots: {
    base: "fixed bottom-0 w-full bg-indigo-2 py-2 dark:bg-indigodark-2 md:hidden",
    bodyContainer: "mt-1",
    container: "flex justify-between text-center items-center text-xs",
    icon: "w-5 h-5 inline-block",
    listContainer: "w-1/3",
  },
});

export const Footer = async () => {
  const profile = await getProfile();
  const { base, bodyContainer, container, icon, listContainer } = navigation();

  return (
    <footer className={base()}>
      <nav>
        <ul className={container()}>
          <li className={listContainer()}>
            <NavigationLink href="/">
              <MagnifyingGlassIcon className={icon()} />
              <p className={bodyContainer()}>メモを検索</p>
            </NavigationLink>
          </li>
          <li className={listContainer()}>
            {profile ? (
              <NoteWriteButton
                profile={profile}
                className="p-2 hover:bg-indigo-3 dark:hover:bg-indigodark-3"
              />
            ) : null}
          </li>
          <li className={listContainer()}>
            <NavigationLink href="/setting/account">
              <Avatar
                noDialog
                src={profile?.avatar_url ?? ""}
                alt={profile?.user_name}
                width={96}
                height={96}
                className="inline-block h-5 w-5 overflow-hidden rounded-full"
              />
              <p className={bodyContainer()}>マイMemo</p>
            </NavigationLink>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
