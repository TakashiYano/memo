import { tv } from "tailwind-variants";

import { Button } from "@/component/Button";
import { LabelColorDropdown } from "@/component/Dialog/LabelColorDropdown";
import { Input } from "@/component/Form/Input";
import { LabelChip } from "@/component/Input";
import { type Label } from "@/lib/label/type";

const card = tv({
  slots: {
    base: "border border-indigo-6 bg-indigo-3 dark:border-indigodark-6 dark:bg-indigodark-3",
    buttonContainer: "flex justify-end gap-x-2",
    chipContainer: "mb-2",
    inputContainer: "space-y-2",
    wrapper: "px-4 py-2",
  },
});

type EditCardProps = {
  createLabel: () => void;
  editingLabelId: string | null;
  label: Label | null;
  labelColorHex: string;
  nameInputText?: string;
  resetState: () => void;
  setEditingLabelId: (id: string | null) => void;
  setLabelColorHex: (color: string) => void;
  setNameInputText: (text: string) => void;
  updateLabel: (id: string) => void;
};

export const EditCard = (props: EditCardProps): JSX.Element => {
  const { base, buttonContainer, chipContainer, inputContainer, wrapper } = card();
  const {
    createLabel,
    editingLabelId,
    label,
    labelColorHex,
    nameInputText,
    resetState,
    setEditingLabelId,
    setLabelColorHex,
    setNameInputText,
    updateLabel,
  } = props;

  const handleEdit = () => {
    editingLabelId && updateLabel(editingLabelId);
    setEditingLabelId(null);
  };

  return (
    <div className={base()}>
      <div className={wrapper()}>
        {nameInputText && (
          <div className={chipContainer()}>
            <LabelChip color={labelColorHex} text={nameInputText} />
          </div>
        )}
        <div className={inputContainer()}>
          <Input
            type="text"
            value={nameInputText}
            onChange={(event) => {
              return setNameInputText(event.target.value);
            }}
            autoFocus
          />
          <LabelColorDropdown labelColor={labelColorHex} setLabelColor={setLabelColorHex} />
          <div className={buttonContainer()}>
            <Button variant="outline" className="px-4 py-2" onClick={resetState}>
              キャンセル
            </Button>
            <Button
              type="button"
              variant="outline"
              className="px-4 py-2"
              onClick={() => {
                return label ? handleEdit() : createLabel();
              }}
            >
              保存
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
