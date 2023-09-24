import { type FC } from "react";
import Link from "next/link";

import { ArrowTopRightOnSquareIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import cc from "classcat";

import { hasButton, isLink, type ListProps } from "./type";

export const List: FC<ListProps> = (props) => {
  const { items, title } = props;

  return (
    <div className="space-y-1">
      {title ? <div className="text-sm font-bold text-gray-400">{title}</div> : null}
      <ul>
        {items.map((item, i) => {
          const className = cc([
            "flex justify-between items-center py-3 px-4 -mx-4 text-lg font-bold",
            {
              "hover:bg-gray-100 focus-visible:bg-gray-100 dark:hover:bg-gray-700 dark:focus-visible:bg-gray-700 focus:outline-none":
                isLink(item),
            },
          ]);

          if (isLink(item)) {
            const isExternal = item.href.slice(0, 1) !== "/";
            return (
              <li key={i}>
                <Link href={item.href} legacyBehavior>
                  <a
                    className={className}
                    target={isExternal ? "_blank" : undefined}
                    rel={isExternal ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                    {isExternal ? (
                      <ArrowTopRightOnSquareIcon className="h-5 w-5" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5" />
                    )}
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
