import { Fragment, type FC } from "react";

import { Menu, Transition } from "@headlessui/react";
import { TwitterPicker as TwitterPicker_, type TwitterPickerProps } from "react-color";

type LabelColorDropdownProps = {
  canEdit: boolean;
  isCreateMode: boolean;
  labelColor: string;
  labelId: string;
  setLabelColor: (color: string) => void;
};

// TwitterPicker is a Class component, but the types are broken in React 18.
// TODO: Maybe move away from this component, since it hasn't been updated for 3 years.
// https://github.com/casesandberg/react-color/issues/883
const TwitterPicker = TwitterPicker_ as unknown as React.FunctionComponent<TwitterPickerProps>;

export const LabelColorDropdown: FC<LabelColorDropdownProps> = (props) => {
  const { isCreateMode, labelColor, setLabelColor } = props;

  return (
    <div>
      <Menu as="div">
        <Menu.Button>
          <LabelOption
            isCreateMode={isCreateMode}
            labelId={""}
            color={labelColor}
            isDropdownOption={false}
          />
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
          <Menu.Items>
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
              styles={{
                default: {
                  input: {
                    color: "$grayText",
                  },
                },
              }}
            />
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

const LabelOption = (props: {
  color: string;
  isCreateMode: boolean | undefined;
  isDropdownOption?: boolean;
  labelId: string;
}): JSX.Element => {
  const { color } = props;

  return (
    <div className="mt-0.5 flex h-10 w-full items-center gap-x-2 rounded-xl border border-indigo-6 bg-indigo-3 px-5 py-6 font-bold focus:outline-none focus:ring-2 focus:ring-indigo-11 dark:border-indigodark-6 dark:bg-indigodark-3 dark:focus:ring-indigodark-11">
      <LabelColorIcon color={color} />
      <span className="text-xs text-indigo-12 dark:text-indigodark-12">{color}</span>
    </div>
  );
};

const LabelColorIcon = (props: { color: string }): JSX.Element => {
  const { color } = props;
  return (
    <div className="h-5 w-5 rounded-full border-none" style={{ backgroundColor: `${color}` }} />
  );
};
