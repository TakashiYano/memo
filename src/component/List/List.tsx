import { type FC } from "react";
import Link from "next/link";

import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { tv } from "tailwind-variants";

import { hasButton, isLink, type ListProps } from "./type";

const list = tv({
  base: "flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold",
  variants: {
    isLinked: {
      true: "hover:bg-indigo-4 dark:hover:bg-indigodark-4  focus-visible:bg-indigo-4 dark:focus-visible:bg-indigo-4 focus:outline-none",
    },
  },
});

export const List: FC<ListProps> = (props) => {
  const { items, title } = props;

  return (
    <div className="space-y-1">
      {title ? (
        <div className="text-sm font-bold text-indigo-11 dark:text-indigodark-11">{title}</div>
      ) : null}
      <ul>
        {items.map((item, i) => {
          const className = list({ isLinked: isLink(item) });

          if (isLink(item)) {
            return (
              <li key={i}>
                <Link href={item.href} legacyBehavior>
                  <a className={className}>
                    {item.label}
                    <ChevronRightIcon className="h-5 w-5" />
                  </a>
                </Link>
              </li>
            );
          }

          if (hasButton(item)) {
            return (
              <li key={i}>
                <div className={className}>
                  <div className="flex-1">{item.label}</div>
                  <div className="shrink-0">{item.button}</div>
                </div>
              </li>
            );
          }

          const handleClick = item.onClick;
          return (
            <li key={i}>
              <button type="button" onClick={handleClick} className={className}>
                {item.label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
