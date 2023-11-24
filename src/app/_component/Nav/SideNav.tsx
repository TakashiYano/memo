import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { LabelAccordion } from "@/app/_component/Part/LabelAccordion";
import { NoteWriteButton } from "@/app/_component/Part/NoteWriteButton";
import { Avatar } from "@/component/Avatar";
import { ActiveLink } from "@/lib/next/ActiveLink";
import { getLabels } from "@/lib/supabase/label";
import { getProfile } from "@/lib/supabase/user";

const navigation = tv({
  slots: {
    base: "bg-indigo-2 dark:bg-indigodark-2 p-5 w-[210px] max-w-[210px] hidden md:inline sticky top-0 self-start",
    bodyWrapper:
      "flex items-center gap-x-3 rounded-full p-2 hover:bg-indigo-3 dark:hover:bg-indigodark-3",
    icon: "w-5 h-5",
    listWrapper: "text-lg space-y-2",
    title: "text-xl font-bold text-indigo-12 dark:text-indigodark-12",
    wrapper: "mt-10 space-y-5",
  },
});

export const SideNav = async () => {
  const { base, bodyWrapper, icon, listWrapper, title, wrapper } = navigation();
  const profilePromise = getProfile();
  const labelsPromise = getLabels();
  const [profile, labels] = await Promise.all([profilePromise, labelsPromise]);
  if (!profile) {
    return null;
  }

  return (
    <div className={base()}>
      <h1 className={title()}>Memo</h1>
      <nav className={wrapper()}>
        <ul className={listWrapper()}>
          <li>
            <ActiveLink href="/">
              <div className={bodyWrapper()}>
                <MagnifyingGlassIcon className={icon()} />
                <p>メモを検索</p>
              </div>
            </ActiveLink>
          </li>
          <li>
            <ActiveLink href="/setting/account">
              <div className={bodyWrapper()}>
                <Avatar
                  noDialog
                  src={profile.avatar_url ?? ""}
                  alt={profile.user_name}
                  width={96}
                  height={96}
                  className="h-5 w-5 overflow-hidden rounded-full"
                />
                <p>マイMemo</p>
              </div>
            </ActiveLink>
          </li>
        </ul>
        <div className="border border-indigo-6 dark:border-indigodark-6" />
        <ul className={listWrapper()}>
          <li>
            <NoteWriteButton profile={profile} className="flex items-center gap-x-3 p-2" />
          </li>
          <li>
            <LabelAccordion labels={labels} />
          </li>
        </ul>
      </nav>
    </div>
  );
};
