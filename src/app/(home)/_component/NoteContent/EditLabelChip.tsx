import { XMarkIcon } from "@heroicons/react/20/solid";

import { Button } from "@/component/Button";

type EditLabelChipProps = {
  color: string;
  isSelected?: boolean;
  text: string;
  xAction: () => void;
};

export const EditLabelChip = (props: EditLabelChipProps): JSX.Element => {
  const { color, isSelected, text, xAction } = props;

  return (
    <span
      className={`m-0.5 inline-table cursor-pointer whitespace-nowrap rounded-xl border-indigo-6 bg-indigo-9 bg-clip-padding px-2 py-0.5 dark:border-indigodark-6 dark:bg-indigodark-9 ${
        isSelected && "ring-2"
      }`}
    >
      <div className="flex flex-row items-center justify-around gap-1.5">
        <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${color}` }} />
        <span className="text-xs text-indigo-12 dark:text-indigodark-12">{text}</span>
        <Button
          variant="ghost"
          onClick={(event) => {
            xAction();
            event.preventDefault();
          }}
          className="hover:bg-indigo-10 dark:hover:bg-indigodark-10"
        >
          <XMarkIcon
            className={`h-5 w-5 ${isSelected && "text-indigo-11 dark:text-indigodark-11"}`}
          />
        </Button>
      </div>
    </span>
  );
};
