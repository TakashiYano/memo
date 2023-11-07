"use client";

import { useMemo, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { TagIcon } from "@heroicons/react/24/outline";

import { type Label } from "@/lib/label/type";

const NavigationLink = ({
  children,
  currentPath,
  href,
}: {
  children: React.ReactNode;
  currentPath: string;
  href: string;
}) => {
  return (
    <Link
      href={href}
      className={`flex items-center gap-x-3 rounded-full p-2 hover:bg-indigo-3 dark:hover:bg-indigodark-3 ${
        currentPath === href
          ? " text-indigo-11 dark:text-indigodark-11"
          : "text-indigo-12 dark:text-indigodark-12"
      }`}
    >
      {children}
    </Link>
  );
};

type LabelListItemProps = {
  applySearchQuery: (searchTerm: string) => void;
  label: Label;
  searchTerm: string | undefined;
};

const LabelListItem = (props: LabelListItemProps): JSX.Element => {
  const { applySearchQuery, label, searchTerm } = props;
  const labelId = `checkbox-label-${label.id}`;
  const checkboxRef = useRef<HTMLInputElement | null>(null);
  const state = useMemo(() => {
    const term = searchTerm ?? "";
    if (term.indexOf(`label:\"${label.name}\"`) >= 0) {
      return "on";
    }
    return "off";
  }, [searchTerm, label]);

  return (
    <div
      className={`m-0 flex h-8 w-full cursor-pointer items-center justify-start pl-2.5 align-middle hover:bg-indigo-4 active:bg-indigo-5 dark:hover:bg-indigodark-4 dark:active:bg-indigodark-5 ${
        state === "on" && "bg-indigo-5 dark:bg-indigodark-5"
      }`}
    >
      <label
        className="flex w-full cursor-pointer items-center truncate"
        onClick={() => {
          const query = searchTerm?.replace(/label:\"(.*)\"/, "") ?? "";
          if (checkboxRef.current?.checked) {
            applySearchQuery(query.trim());
          } else {
            applySearchQuery(`${query.trim()} label:\"${label.name}\"`);
          }
        }}
      >
        <div className="flex h-full w-8 items-center">
          <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${label.color}` }} />
        </div>
        <div className="flex h-full items-center text-clip">
          <p className="text-xs text-indigo-12 dark:text-indigodark-12">{label.name}</p>
        </div>
      </label>
      <span className="ml-auto">
        <input
          id={labelId}
          ref={checkboxRef}
          type="checkbox"
          checked={state === "on"}
          onChange={(e) => {
            if (e.target.checked) {
              applySearchQuery(`${searchTerm ?? ""} label:\"${label.name}\"`);
            } else {
              const query = searchTerm?.replace(`label:\"${label.name}\"`, "") ?? "";
              applySearchQuery(query);
            }
          }}
        />
      </span>
    </div>
  );
};

type LibraryFilterMenuProps = {
  applySearchQuery: (searchTerm: string) => void;
  searchTerm: string | undefined;
};

type AccordionProps = LibraryFilterMenuProps & { labels: Label[] };

export const Accordion = (props: AccordionProps) => {
  const { labels } = props;
  const currentPath = usePathname();

  return (
    <div className="w-full">
      <Disclosure>
        {({ open }) => {
          return (
            <>
              <Disclosure.Button className="flex w-full justify-between p-2">
                <span>ラベル</span>
                <ChevronUpIcon className={`${open ? "rotate-180" : ""} h-5 w-5`} />
              </Disclosure.Button>
              <Disclosure.Panel className="text-sm">
                <div>
                  {labels.map((label) => {
                    return <LabelListItem key={label.id} label={label} {...props} />;
                  })}
                  <div className="pt-2">
                    <NavigationLink href="/dashboard/label" currentPath={currentPath}>
                      <TagIcon className="h-5 w-5" />
                      <p className="text-lg">ラベルを編集</p>
                    </NavigationLink>
                  </div>
                </div>
              </Disclosure.Panel>
            </>
          );
        }}
      </Disclosure>
    </div>
  );
};
