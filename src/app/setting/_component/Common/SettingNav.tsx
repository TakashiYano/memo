import { tv } from "tailwind-variants";

import { NavigationLink } from "@/app/setting/_component/Common/SettingNavLink";

const navigation = tv({
  slots: {
    base: "pt-4",
    list: "w-1/2 text-center text-[16px]",
    listContainer: "flex",
    navContainer: "border-b-[1px] border-indigo-6 dark:border-indigodark-6",
  },
});

export const SettingNav = () => {
  const { base, list, listContainer, navContainer } = navigation();

  return (
    <div className={base()}>
      <nav className={navContainer()}>
        <ul className={listContainer()}>
          <li className={list()}>
            <NavigationLink href="/setting/account">アカウント</NavigationLink>
          </li>
          <li className={list()}>
            <NavigationLink href="/setting/profile">プロフィール</NavigationLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
