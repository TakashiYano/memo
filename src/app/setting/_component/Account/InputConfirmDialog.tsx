import { Fragment, useCallback, useRef, useState, type ChangeEvent, type FC } from "react";

import { Dialog, Transition } from "@headlessui/react";
import { toast } from "react-hot-toast";

import { Button } from "@/component/Button";
import { Input } from "@/component/Form/Input";

type Props = {
  buttonText: string;
  onClickOk: () => Promise<void>;
  onClose: () => void;
  show: boolean;
  title: string;
};

export const InputConfirmDialog: FC<Props> = (props) => {
  const { buttonText, onClickOk, onClose, show, title } = props;
  const buttonRef = useRef(null);
  const [text, setText] = useState("");

  const handleClose = useCallback(() => {
    onClose();
    setText("");
  }, [onClose]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  const handleClick = useCallback(async () => {
    if (text === "ok") {
      toast.error("大文字で入力してください");
      return;
    }
    if (text !== "OK") {
      toast.error("テキストに誤りがあります");
      return;
    }
    await toast.promise(onClickOk(), {
      error: "失敗しました",
      loading: "処理中",
      success: "削除しました",
    });
  }, [onClickOk, text]);

  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        static
        className="fixed inset-0 z-10 overflow-y-auto"
        open={show}
        onClose={handleClose}
        initialFocus={buttonRef}
      >
        <div className="flex min-h-screen items-center justify-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-200"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 opacity-40" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-0 scale-95"
            enterTo="opacity-100 translate-y-0 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 scale-100"
            leaveTo="opacity-0 translate-y-0 scale-95"
          >
            <div className="z-10 inline-block w-10/12 max-w-sm overflow-hidden rounded-2xl bg-indigo-2 p-4 text-left align-middle shadow-xl transition-all dark:bg-indigodark-2 sm:p-6">
              <div className="text-center">
                <Dialog.Title as="h3" className="font-bold leading-6">
                  {title}
                </Dialog.Title>
                <div className="mt-4">
                  <p className="whitespace-pre-line text-sm opacity-70">
                    {`この操作は取り消すことはできません。\u000A実行するには「OK」と入力してください`}
                  </p>
                </div>
                <div className="mt-2">
                  <Input name="name" value={text} onChange={handleChange} />
                </div>
              </div>
              <div className="mt-6 flex space-x-3 sm:space-x-4">
                <Button
                  variant="outline"
                  className="flex-1 py-2 text-sm"
                  onClick={handleClose}
                  ref={buttonRef}
                >
                  キャンセル
                </Button>
                <Button variant="error" className="flex-1 py-2 text-sm" onClick={handleClick}>
                  {buttonText}
                </Button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};
