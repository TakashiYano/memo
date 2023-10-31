"use client";

import { useMemo, useState } from "react";

import { tv } from "tailwind-variants";

import { EditCard } from "@/app/dashboard/_component/Label/EditCard";
import { LabelListItem } from "@/app/dashboard/_component/Label/LabelListItem";
import { Button } from "@/component/Button";
import { ConfirmDialog } from "@/component/Dialog/ConfirmDialog";
import { labelColorObjects } from "@/lib/label/labelColorObjects";
import { type Label } from "@/lib/label/type";
import { useCreateLabel } from "@/lib/label/useCreateLabel";
import { useDeleteLabel } from "@/lib/label/useDeleteLabel";
import { useUpdateLabel } from "@/lib/label/useUpdateLabel";
import { type ProfileAllType } from "@/lib/profile/type";

const labelList = tv({
  slots: {
    base: "p-4",
    body: "text-indigo-11 dark:text-indigodark-11",
    bodyWrapper: "ml-4 mt-2",
    headerWrapper: "flex items-center justify-between",
    listContainer:
      "divide-y divide-indigo-6 rounded-xl border border-indigo-6 dark:divide-indigodark-6 dark:border-indigodark-6",
    listWrapper: "group",
    title: "px-4 py-2 text-xl font-bold",
    wrapper: "space-y-2",
  },
});

type LabelColor = "#FF5D99" | "#7CFF7B" | "#FFD234" | "#7BE4FF" | "#CE88EF" | "#EF8C43" | "#000000";

type LabelListProps = ProfileAllType & { labels: Label[] };

export const LabelList = (props: LabelListProps) => {
  const { base, body, bodyWrapper, headerWrapper, listContainer, listWrapper, title, wrapper } =
    labelList();
  const { labels, profile } = props;
  const [labelColorHex, setLabelColorHex] = useState("#000000");
  const [editingLabelId, setEditingLabelId] = useState<string | null>(null);
  const [nameInputText, setNameInputText] = useState<string>("");
  const [isCreateMode, setIsCreateMode] = useState<boolean>(false);
  const [isShowConfirmDialog, setIsShowConfirmDialog] = useState<boolean>(false);
  const [deletingLabelId, setDeletingLabelId] = useState<string>("");
  const { handleCreateLabel } = useCreateLabel({
    color: labelColorHex,
    name: nameInputText,
    profile,
  });
  const { handleDeleteLabel } = useDeleteLabel({ id: deletingLabelId });
  const { handleUpdateLabel } = useUpdateLabel({
    color: labelColorHex,
    id: editingLabelId ?? "",
    name: nameInputText,
  });

  const sortedLabels = useMemo(() => {
    return labels.sort((left: Label, right: Label) => {
      return left.name.localeCompare(right.name);
    });
  }, [labels]);

  const resetLabelState = () => {
    setIsCreateMode(false);
    setEditingLabelId("");
    setNameInputText("");
    setLabelColorHex("#000000");
  };

  const createLabel = () => {
    handleCreateLabel();
    resetLabelState();
  };

  const updateLabel = () => {
    handleUpdateLabel();
  };

  const onDeleteLabel = () => {
    handleDeleteLabel();
  };

  const onEditPress = (label: Label | null) => {
    if (label) {
      setEditingLabelId(label.id);
      setNameInputText(label.name);
      setLabelColorHex(label.color);
    } else {
      resetLabelState();
    }
  };

  const deleteLabel = (id: string) => {
    setDeletingLabelId(id);
    setIsShowConfirmDialog(true);
  };

  const handleGenerateRandomColor = () => {
    const colorHexes = Object.keys(labelColorObjects).slice(0, -1) as LabelColor[];
    const randomColorHex = colorHexes[Math.floor(Math.random() * colorHexes.length)];
    setLabelColorHex(randomColorHex);
  };

  return (
    <section>
      <div className={base()}>
        <div className={wrapper()}>
          <div>
            <div className={headerWrapper()}>
              <h2 className={title()}>ラベル</h2>
              <div>
                {isCreateMode ? null : (
                  <>
                    <Button
                      onClick={() => {
                        resetLabelState();
                        handleGenerateRandomColor();
                        setIsCreateMode(true);
                      }}
                      variant="solid"
                      className="px-4 py-2"
                    >
                      ラベルを作成
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
          <>
            {isCreateMode ? (
              <EditCard
                label={null}
                labelColorHex={labelColorHex}
                editingLabelId={editingLabelId}
                setEditingLabelId={setEditingLabelId}
                setLabelColorHex={setLabelColorHex}
                nameInputText={nameInputText}
                setNameInputText={setNameInputText}
                createLabel={createLabel}
                updateLabel={updateLabel}
                resetState={resetLabelState}
              />
            ) : null}
          </>
          {labels.length !== 0 ? (
            <ul className={listContainer()}>
              {sortedLabels
                ? sortedLabels.map((label) => {
                    const cardProps = {
                      createLabel: createLabel,
                      deleteLabel: deleteLabel,
                      editingLabelId: editingLabelId,
                      handleGenerateRandomColor: handleGenerateRandomColor,
                      isCreateMode: isCreateMode,
                      label: label,
                      labelColorHex: labelColorHex,
                      nameInputText: nameInputText,
                      resetState: resetLabelState,
                      setEditingLabelId: setEditingLabelId,
                      setIsCreateMode: setIsCreateMode,
                      setLabelColorHex: setLabelColorHex,
                      setNameInputText: setNameInputText,
                      updateLabel: updateLabel,
                    };

                    if (editingLabelId == label.id) {
                      return (
                        <li key={`edit-${label.id}`} className={listWrapper()}>
                          <EditCard {...cardProps} />
                        </li>
                      );
                    }

                    return (
                      <li key={label.id} className={listWrapper()}>
                        <LabelListItem {...cardProps} onEditPress={onEditPress} />
                      </li>
                    );
                  })
                : null}
            </ul>
          ) : (
            <div className={bodyWrapper()}>
              <p className={body()}>ラベルがありません</p>
            </div>
          )}
        </div>
      </div>

      <ConfirmDialog
        show={isShowConfirmDialog}
        onClose={() => {
          return setIsShowConfirmDialog(false);
        }}
        onClickOk={() => {
          onDeleteLabel();
          setIsShowConfirmDialog(false);
        }}
        title="ラベルを削除"
        description="ラベルを削除すると、すべてのページからラベルが削除されます。"
        buttonText="削除する"
        buttonColor="red"
      />
    </section>
  );
};
