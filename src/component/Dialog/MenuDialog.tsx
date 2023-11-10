import { Fragment, useRef, type FC, type ReactNode } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { Button } from "@/component/Button";

type MenuDialogProps = {
  children: ReactNode;
  onClose: () => void;
  show: boolean;
};

export const MenuDialog: FC<MenuDialogProps> = (props) => {
  const { children, onClose, show } = props;
  const buttonRef = useRef(null);

  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        static
        open={show}
        onClose={onClose}
        initialFocus={buttonRef}
        className="bg-indigo-1/75 dark:bg-indigodark-1/75 sm:fixed sm:inset-0 sm:z-10 sm:overflow-y-auto"
      >
        <div className="min-h-screen text-center">
          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 opacity-40" />
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
              <div className="relative rounded-t-3xl bg-indigo-2 px-6 pb-12 pt-20 dark:bg-indigodark-2 sm:rounded-2xl">
                <Button
                  ref={buttonRef}
                  variant="ghost"
                  className="absolute right-5 top-4 p-2"
                  onClick={onClose}
                >
                  <span className="sr-only">Close panel</span>
                  <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                </Button>
                <div className="space-y-4">{children}</div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
