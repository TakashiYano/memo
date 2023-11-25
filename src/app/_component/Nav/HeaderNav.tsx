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

type HeaderNavProps = {
  lists: { body: string; href: string }[];
};

export const HeaderNav = (props: HeaderNavProps) => {
  const { lists } = props;
  const { base, bodyWrapper, list, listWrapper } = navigation();

  return (
    <div className={base()}>
      <nav>
        <ul className={listWrapper()}>
          {lists.map((l) => {
            return (
              <li key={l.href} className={list()}>
                <ActiveLink href={l.href}>
                  <p className={bodyWrapper()}>{l.body}</p>
                </ActiveLink>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};
