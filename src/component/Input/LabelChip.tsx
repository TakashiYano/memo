type LabelChipProps = {
  color: string; // expected to be a RGB hex color string
  text: string;
};

export const LabelChip = (props: LabelChipProps): JSX.Element => {
  const { color, text } = props;

  return (
    <div className="grid place-items-start transition duration-200 ease-in-out">
      <div className="flex items-center gap-x-2 rounded-full bg-indigo-9 p-2 dark:bg-indigodark-9">
        <div className="h-5 w-5 rounded-full border-none" style={{ backgroundColor: `${color}` }} />
        <span className="text-xs text-indigo-12 dark:text-indigodark-12">{text}</span>
      </div>
    </div>
  );
};
