import { XMarkIcon } from "@heroicons/react/20/solid";

import { Button } from "@/component/Button";

type EditLabelChipProps = {
  color: string;
  text: string;
  xAction: () => void;
};

export const EditLabelChip = (props: EditLabelChipProps): JSX.Element => {
  const { color, text, xAction } = props;

  return (
    <div>
      <div>
        <div className="h-5 w-5 rounded-full" style={{ backgroundColor: `${color}` }} />
        <span className="text-xs text-indigo-12 dark:text-indigodark-12">{text}</span>
        <Button
          variant="ghost"
          onClick={(event) => {
            xAction();
            event.preventDefault();
          }}
        >
          <XMarkIcon className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
};
