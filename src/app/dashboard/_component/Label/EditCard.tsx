import { Button } from "@/component/Button";
import { LabelColorDropdown } from "@/component/Dialog/LabelColorDropdown";
import { Input } from "@/component/Form/Input";
import { LabelChip } from "@/component/Input";
import { type Label } from "@/lib/label/type";

type EditCardProps = {
  createLabel: () => void;
  editingLabelId: string | null;
  isCreateMode: boolean;
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
  const {
    createLabel,
    editingLabelId,
    isCreateMode,
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
    <div>
      <div>
        {nameInputText && (
          <div>
            <LabelChip color={labelColorHex} text={nameInputText} />
          </div>
        )}
        <div className="flex items-center gap-4">
          <Input
            type="text"
            value={nameInputText}
            onChange={(event) => {
              return setNameInputText(event.target.value);
            }}
            autoFocus
          />
          <LabelColorDropdown
            isCreateMode={isCreateMode && !label}
            canEdit={editingLabelId === label?.id}
            labelId={label?.id || ""}
            labelColor={labelColorHex}
            setLabelColor={setLabelColorHex}
          />
          <div className="flex gap-x-2">
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
