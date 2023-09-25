import { type FC } from "react";
import Image from "next/image";
import Link from "next/link";

import { HomeIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { type UserType } from "@/lib/user/type";

const user: UserType = {
  avatarUrl: "/mocks/avatar01.jpg",
  id: "engineer",
  name: "yanot",
};

const footer = tv({
  slots: {
    base: "fixed bottom-0 w-full bg-indigo-2 py-2 dark:bg-indigodark-2 md:hidden",
    image: "inline-block h-5 w-5",
    li: "w-1/2 hover:text-indigo-11 dark:hover:text-indigodark-11",
    text: "mt-1",
    ul: "flex justify-between text-center text-xs",
  },
});

export const Footer: FC = () => {
  const { base, image, li, text, ul } = footer();

  return (
    <footer className={base()}>
      <nav>
        <ul className={ul()}>
          <li className={li()}>
            <Link href="/">
              <HomeIcon className={image()} />
              <p className={text()}>ホーム</p>
            </Link>
          </li>
          <li className={li()}>
            <Link href="/setting">
              <Image
                src={user.avatarUrl}
                alt={user.name}
                width={96}
                height={96}
                className={image({ class: "overflow-hidden rounded-full" })}
              />
              <p className={text()}>マイMemo</p>
            </Link>
          </li>
        </ul>
      </nav>
    </footer>
  );
};
