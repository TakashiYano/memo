import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { LabelAccordion } from "@/app/_component/Part/LabelAccordion";
import { NoteWriteButton } from "@/app/_component/Part/NoteWriteButton";
import { NavigationLink } from "@/app/_component/Part/SideNavLink";
import { Avatar } from "@/component/Avatar";
import { getLabels } from "@/lib/supabase/label";
import { getProfile } from "@/lib/supabase/user";

const navigation = tv({
  slots: {
    base: "sticky top-0 hidden self-start bg-indigo-2 p-5 dark:bg-indigodark-2 md:inline w-[210px] max-w-[210px]",
    body: "text-lg",
    icon: "w-5 h-5 inline-block",
    title: "text-xl font-bold text-indigo-12 dark:text-indigodark-12",
  },
});

export const SideNav = async () => {
  const profilePromise = getProfile();
  const labelsPromise = getLabels();
  const [profile, labels] = await Promise.all([profilePromise, labelsPromise]);
  const { base, body, icon, title } = navigation();

  return (
    <div className={base()}>
      <nav>
        <ul className="space-y-2">
          <li className="mb-10">
            <h1 className={title()}>Memo</h1>
          </li>
          <li className="ml-1">
            <NavigationLink href="/">
              <MagnifyingGlassIcon className={icon()} />
              <p className={body()}>メモを検索</p>
            </NavigationLink>
          </li>
          <li className="ml-1">
            <NavigationLink href="/setting/account">
              <Avatar
                noDialog
                src={profile?.avatar_url ?? ""}
                alt={profile?.user_name}
                width={96}
                height={96}
                className="h-5 w-5 overflow-hidden rounded-full"
              />
              <p className={body()}>マイMemo</p>
            </NavigationLink>
          </li>
          <li className="ml-1">
            {profile ? (
              <NoteWriteButton profile={profile} className="flex items-center gap-x-3 p-2" />
            ) : null}
          </li>
          <li className="ml-1">
            <LabelAccordion labels={labels} />
          </li>
        </ul>
      </nav>
    </div>
  );
};
