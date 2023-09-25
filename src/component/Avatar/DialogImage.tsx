"use client";

import { Fragment, useCallback, useState, type FC, type ReactNode } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export const DialogImage: FC<{ children: ReactNode; alt?: string; src?: string }> = (props) => {
  const { children, alt, src } = props;
  const [isShow, setIsShow] = useState(false);
  const handleOpen = useCallback(() => {
    setIsShow(true);
  }, []);
  const handleClose = useCallback(() => {
    setIsShow(false);
  }, []);

  return (
    <>
      <button className="contents" onClick={handleOpen}>
        {children}
      </button>

      <Transition as={Fragment} show={isShow}>
        <Dialog
          static
          className="fixed inset-0 z-10 overflow-y-auto"
          open={isShow}
          onClose={handleClose}
        >
          <div className="relative min-h-screen">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0 bg-indigo-5/75 transition-opacity" />
            </Transition.Child>

            <Transition.Child
              as={Fragment}
              enter="ease-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div>
                <img
                  className="absolute inset-0 m-auto max-h-full max-w-full"
                  src={src}
                  alt={alt}
                />
                <button
                  type="button"
                  className="absolute left-3 top-3.5 rounded-full border border-transparent bg-indigo-4 p-1.5 hover:bg-indigo-3 focus:outline-none dark:bg-indigodark-4  dark:hover:bg-indigodark-3"
                  onClick={handleClose}
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
