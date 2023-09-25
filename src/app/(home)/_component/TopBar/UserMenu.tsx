"use client";

import { Fragment, type FC } from "react";
import Link from "next/link";

import { Popover, Transition } from "@headlessui/react";
import { ArrowLeftOnRectangleIcon } from "@heroicons/react/24/outline";

import { Avatar } from "@/component/Avatar/Avatar";
import { ICON_SIZE } from "@/lib/const/constants";
import { type UserType } from "@/lib/user/type";
import { useAuth } from "@/lib/user/useAuth";

const example: UserType = {
  avatarUrl: "/mocks/avatar01.jpg",
  id: "engineer",
  name: "yanot",
};

export const UserMenu: FC = () => {
  const { handleSignOut, profileFromGoogle } = useAuth();
  const user = profileFromGoogle
    ? {
        avatarUrl: profileFromGoogle.avatarUrl ?? "",
        id: profileFromGoogle.id ?? "",
        name: profileFromGoogle.name ?? "",
      }
    : example;

  return (
    <Popover className="grid">
      {({ open }) => {
        return (
          <>
            <Popover.Button className="rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-4">
              <Avatar alt={user.name} src={user.avatarUrl} className={ICON_SIZE} />
            </Popover.Button>

            <div className="relative">
              <Transition
                show={open}
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 -translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-1"
              >
                <Popover.Panel
                  static
                  className="absolute left-full z-10 mt-2 w-screen max-w-xs -translate-x-full pl-8 sm:max-w-sm sm:px-0 xl:-left-full xl:-translate-x-1/2 2xl:left-1/2"
                >
                  <div className="overflow-hidden rounded-2xl bg-indigo-2 py-4 shadow-lg ring-1 ring-indigo-4/20 dark:bg-indigodark-2">
                    <Link
                      href="/setting"
                      className="flex items-center p-4 hover:bg-indigo-4 focus:outline-none  focus-visible:bg-indigo-4 dark:hover:bg-indigodark-4 dark:focus-visible:bg-indigo-4"
                    >
                      <Avatar alt={user.name} src={user.avatarUrl} className="h-14 w-14" />
                      <div className="ml-4">
                        <p className="text-base font-bold">yanot</p>
                        <p className="text-sm text-indigo-11 dark:text-indigodark-11">@yanot</p>
                      </div>
                    </Link>
                    <div className="relative grid">
                      <button
                        type="button"
                        className="flex items-center px-4 py-2.5 hover:bg-red-4 focus:outline-none  focus-visible:bg-red-4 dark:hover:bg-reddark-4 dark:focus-visible:bg-red-4"
                        onClick={handleSignOut}
                      >
                        <div className="flex shrink-0 items-center justify-center">
                          <ArrowLeftOnRectangleIcon className="ml-0.5 h-7 w-7 text-red-11 dark:text-reddark-11" />
                        </div>
                        <p className="ml-4 font-bold text-red-11 dark:text-reddark-11">
                          ログアウト
                        </p>
                      </button>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </div>
          </>
        );
      }}
    </Popover>
  );
};
