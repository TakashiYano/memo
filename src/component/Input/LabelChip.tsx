import { tv } from "tailwind-variants";

const chip = tv({
  slots: {
    base: "grid place-items-start",
    labelColor: "h-5 w-5 rounded-full",
    labelName: "text-xs text-indigo-12 dark:text-indigodark-12",
    wrapper: "flex items-center gap-x-2 rounded-full bg-indigo-9 px-4 py-2 dark:bg-indigodark-9",
  },
});

type LabelChipProps = {
  color: string; // expected to be a RGB hex color string
  text: string;
};

export const LabelChip = (props: LabelChipProps): JSX.Element => {
  const { base, labelColor, labelName, wrapper } = chip();
  const { color, text } = props;

  return (
    <div className={base()}>
      <div className={wrapper()}>
        <div className={labelColor()} style={{ backgroundColor: `${color}` }} />
        <span className={labelName()}>{text}</span>
      </div>
    </div>
  );
};
