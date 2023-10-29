"use client";

import { Fragment, useRef, type ComponentProps, type FC } from "react";

import { Dialog, Transition } from "@headlessui/react";

import { Button } from "@/component/Button";

type Props = {
  buttonColor: "blue" | "red";
  buttonText: string;
  description: string;
  disabled?: boolean;
  onClickOk: ComponentProps<"button">["onClick"];
  onClose: () => void;
  show: boolean;
  title: string;
};

export const ConfirmDialog: FC<Props> = (props) => {
  const { buttonColor, buttonText, description, disabled, onClickOk, onClose, show, title } = props;
  const buttonRef = useRef(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        static
        className="fixed inset-0 z-10 overflow-y-auto bg-indigodark-1/50 dark:bg-indigodark-1/50"
        open={show}
        onClose={onClose}
        initialFocus={buttonRef}
      >
        <div className="text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-0 scale-95"
          >
            <div className="inline-block w-10/12 max-w-sm overflow-hidden rounded-2xl bg-indigo-2 p-4 text-left align-middle shadow-xl transition-all dark:bg-indigodark-2 sm:p-6">
              <div className="text-center">
                <Dialog.Title as="h3" className="font-bold leading-6">
                  {title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm opacity-70">{description}</p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 sm:space-x-4">
                <Button
                  variant="outline"
                  className="flex-1 py-2 text-sm"
                  onClick={onClose}
                  ref={buttonRef}
                >
                  キャンセル
                </Button>
                <Button
                  variant={buttonColor === "blue" ? "solid" : "error"}
                  className="flex-1 py-2 text-sm"
                  onClick={onClickOk}
                  disabled={disabled}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
