import Link from "next/link";
import { usePathname } from "next/navigation";

import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/20/solid";
import { TagIcon } from "@heroicons/react/24/outline";

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

export const Accordion = () => {
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
                <ul>
                  <li className="p-2 hover:bg-indigodark-3">React</li>
                  <li className="p-2 hover:bg-indigodark-3">TypeScript</li>
                  <li className="pt-2">
                    <NavigationLink href="/dashboard/label" currentPath={currentPath}>
                      <TagIcon className="h-5 w-5" />
                      <p className="text-lg">ラベルを編集</p>
                    </NavigationLink>
                  </li>
                </ul>
              </Disclosure.Panel>
            </>
          );
        }}
      </Disclosure>
    </div>
  );
};
