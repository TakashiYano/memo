import { tv } from "tailwind-variants";

import { ActiveLink } from "@/lib/next/ActiveLink";

const navigation = tv({
  slots: {
    base: "border-b border-indigo-6 dark:border-indigodark-6",
    bodyWrapper: "py-2 hover:text-indigo-11 dark:hover:text-indigodark-11",
    list: "w-full",
    listWrapper: "flex text-center",
  },
});

export const SettingNav = () => {
  const { base, bodyWrapper, list, listWrapper } = navigation();

  return (
    <div className={base()}>
      <nav>
        <ul className={listWrapper()}>
          <li className={list()}>
            <ActiveLink href="/setting/account">
              <p className={bodyWrapper()}>アカウント</p>
            </ActiveLink>
          </li>
          <li className={list()}>
            <ActiveLink href="/setting/profile">
              <p className={bodyWrapper()}>プロフィール</p>
            </ActiveLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
