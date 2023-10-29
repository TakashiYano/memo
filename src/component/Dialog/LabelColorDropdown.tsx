import { Fragment, useRef } from "react";

import { Menu, Transition } from "@headlessui/react";
import { TwitterPicker as TwitterPicker_, type TwitterPickerProps } from "react-color";

// TwitterPicker is a Class component, but the types are broken in React 18.
// TODO: Maybe move away from this component, since it hasn't been updated for 3 years.
// https://github.com/casesandberg/react-color/issues/883
const TwitterPicker = TwitterPicker_ as unknown as React.FunctionComponent<TwitterPickerProps>;

type LabelColorDropdownProps = {
  labelColor: string;
  setLabelColor: (color: string) => void;
};

export const LabelColorDropdown = (props: LabelColorDropdownProps) => {
  const { labelColor, setLabelColor } = props;
  const pickerRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div>
      <Menu as="div">
        {({ open }) => {
          return (
            <>
              <Menu.Button
                ref={pickerRef}
                className={`
                ${open && "ring-2 ring-indigo-11 dark:ring-indigodark-11"}
                w-full rounded-xl border border-indigo-6 bg-indigo-3 dark:border-indigodark-6 dark:bg-indigodark-3`}
              >
                <LabelOption color={labelColor} />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute mt-2">
                  <TwitterPicker
                    color={labelColor}
                    onChange={(color, event) => {
                      setLabelColor(color.hex.toUpperCase());
                      event.preventDefault();
                    }}
                    onChangeComplete={(color, event) => {
                      setLabelColor(color.hex.toUpperCase());
                      event.preventDefault();
                    }}
                  />
                </Menu.Items>
              </Transition>
            </>
          );
        }}
      </Menu>
    </div>
  );
};

const LabelOption = (props: { color: string }): JSX.Element => {
  const { color } = props;

  return (
    <div className="flex h-10 items-center gap-x-2 px-5 py-6">
      <LabelColorIcon color={color} />
      <span className="text-xs text-indigo-12 dark:text-indigodark-12">{color}</span>
    </div>
  );
};

const LabelColorIcon = (props: { color: string }): JSX.Element => {
  const { color } = props;

  return <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${color}` }} />;
};
