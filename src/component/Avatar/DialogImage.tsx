/* eslint-disable @next/next/no-img-element */
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { FC, ReactNode } from "react";
import { Fragment, useCallback, useState } from "react";

/**@package */
export const DialogImage: FC<{ children: ReactNode; src?: string; alt?: string }> = (props) => {
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
        {props.children}
      </button>

      <Transition as={Fragment} show={isShow}>
        <Dialog static className="fixed inset-0 z-10 overflow-y-auto" open={isShow} onClose={handleClose}>
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
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
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
                <img className="absolute inset-0 m-auto max-h-full max-w-full" src={props.src} alt={props.alt} />
                <button
                  type="button"
                  className="absolute left-3 top-3.5 rounded-full border border-transparent bg-gray-600 p-1.5 text-white hover:bg-gray-500 focus:outline-none"
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
