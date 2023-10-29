"use client";

import { type ChangeEvent } from "react";

import { PencilIcon, TrashIcon } from "@heroicons/react/20/solid";
import { tv } from "tailwind-variants";

import { Button } from "@/component/Button";
import { LabelColorDropdown } from "@/component/Dialog";
import { Input } from "@/component/Form/Input";
import { LabelChip } from "@/component/Input";
import { type Label } from "@/lib/label/type";

const listItem = tv({
  slots: {
    base: "bg-indigo-3 px-4 py-2 hover:bg-indigo-4 group-first:rounded-t-xl group-last:rounded-b-xl dark:bg-indigodark-3 dark:hover:bg-indigodark-4",
    buttonWrapper: "flex gap-x-2",
    wrapper: "flex items-center justify-between",
  },
});

type LabelListItemProps = {
  createLabel: () => void;
  deleteLabel: (id: string) => void;
  editingLabelId: string | null;
  isCreateMode: boolean;
  label: Label | null;
  labelColorHex: string;
  nameInputText: string;
  onEditPress: (label: Label | null) => void;
  resetState: () => void;
  setEditingLabelId: (id: string | null) => void;
  setLabelColorHex: (color: string) => void;
  setNameInputText: (text: string) => void;
  updateLabel: (id: string) => void;
};

export const LabelListItem = (props: LabelListItemProps) => {
  const { base, buttonWrapper, wrapper } = listItem();
  const {
    createLabel,
    deleteLabel,
    editingLabelId,
    isCreateMode,
    label,
    labelColorHex,
    nameInputText,
    onEditPress,
    resetState,
    setEditingLabelId,
    setLabelColorHex,
    setNameInputText,
    updateLabel,
  } = props;
  const showInput = editingLabelId === label?.id || (isCreateMode && !label);
  const labelColor = editingLabelId === label?.id ? labelColorHex : label?.color;

  const handleEdit = () => {
    editingLabelId && updateLabel(editingLabelId);
    setEditingLabelId(null);
  };

  return (
    <div className={base()}>
      <div className={wrapper()}>
        <div>
          {showInput && !label ? null : (
            <div>
              <LabelChip color={labelColor || "#000000"} text={label?.name || ""} />
            </div>
          )}
          {showInput && !label ? (
            <div>
              <Input
                type="text"
                value={nameInputText}
                onChange={(event: ChangeEvent<HTMLInputElement>) => {
                  return setNameInputText(event.target.value);
                }}
                required
                autoFocus
              />
            </div>
          ) : null}
        </div>

        <div>
          {showInput && (
            <LabelColorDropdown labelColor={labelColorHex} setLabelColor={setLabelColorHex} />
          )}
        </div>

        <div>
          {editingLabelId === label?.id || !label ? (
            <>
              <Button
                onClick={() => {
                  resetState();
                }}
              >
                キャンセル
              </Button>
              <Button
                onClick={() => {
                  return label ? handleEdit() : createLabel();
                }}
              >
                保存
              </Button>
            </>
          ) : (
            <div className={buttonWrapper()}>
              <Button
                className="p-2"
                variant="outline"
                onClick={() => {
                  return onEditPress(label);
                }}
                disabled={isCreateMode}
              >
                <PencilIcon className="h-5 w-5" />
              </Button>
              <Button
                className="p-2"
                variant="outline"
                onClick={() => {
                  return deleteLabel(label.id);
                }}
                disabled={isCreateMode}
              >
                <TrashIcon className="h-5 w-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
