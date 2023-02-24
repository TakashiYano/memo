/* eslint-disable @typescript-eslint/naming-convention */
import { Dialog, Transition } from "@headlessui/react";
import cc from "classcat";
import type { ComponentProps, FC } from "react";
import { useRef } from "react";
import { Fragment } from "react";

type Props = {
  show: boolean;
  onClose: () => void;
  onClickOk: ComponentProps<"button">["onClick"];
  title: string;
  description: string;
  buttonText: string;
  buttonColor: "blue" | "red";
};

export const ConfirmDialog: FC<Props> = (props) => {
  const buttonRef = useRef(null);

  return (
    <Transition.Root show={props.show} as={Fragment}>
      <Dialog
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={props.show}
        onClose={props.onClose}
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
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40" />
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
            <div className="inline-block w-10/12 max-w-sm transform overflow-hidden rounded-2xl bg-white p-4 text-left align-middle shadow-xl transition-all dark:bg-gray-800 sm:p-6">
              <div className="text-center">
                <Dialog.Title as="h3" className="font-bold leading-6">
                  {props.title}
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-sm opacity-70">{props.description}</p>
                </div>
              </div>
              <div className="mt-6 flex space-x-3 sm:space-x-4">
                <button
                  type="button"
                  className="inline-flex flex-1 justify-center rounded-full border border-gray-300 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={props.onClose}
                  ref={buttonRef}
                >
                  キャンセル
                </button>
                <button
                  type="button"
                  className={cc([
                    "inline-flex flex-1 justify-center py-2 text-sm font-bold text-white rounded-full border border-transparent focus:ring-2 focus:ring-red-400 focus:outline-none",
                    {
                      "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500": props.buttonColor === "blue",
                      "bg-red-600 hover:bg-red-700 focus:ring-red-500": props.buttonColor === "red",
                    },
                  ])}
                  onClick={props.onClickOk}
                >
                  {props.buttonText}
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
