import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import type { FC, ReactNode } from "react";
import { useRef } from "react";
import { Fragment } from "react";

type MenuDialogProps = {
  children: ReactNode;
  show: boolean;
  onClose: () => void;
};

export const MenuDialog: FC<MenuDialogProps> = (props) => {
  const buttonRef = useRef(null);

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        static
        open={props.show}
        onClose={props.onClose}
        initialFocus={buttonRef}
        className="sm:fixed sm:inset-0 sm:z-10 sm:overflow-y-auto"
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
          </Transition.Child>

          <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
            &#8203;
          </span>

          <div className="fixed bottom-0 w-full sm:static sm:inline-block sm:max-w-md sm:align-middle">
            <Transition.Child
              as={Fragment}
              enter="transform ease-in-out duration-300 sm:ease-out"
              enterFrom="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
              enterTo="translate-y-0 sm:opacity-100 sm:scale-100"
              leave="transform ease-in-out duration-200 sm:ease-in"
              leaveFrom="translate-y-0 sm:opacity-100 sm:scale-100"
              leaveTo="translate-y-full sm:translate-y-0 sm:opacity-0 sm:scale-95"
            >
              <div className="relative rounded-t-2xl bg-white px-6 pt-20 pb-12 dark:bg-gray-800 sm:rounded-b-2xl">
                <button
                  type="button"
                  ref={buttonRef}
                  className="absolute top-4 right-6 rounded-md text-gray-400 hover:text-gray-500 focus:text-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={props.onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div>{props.children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
