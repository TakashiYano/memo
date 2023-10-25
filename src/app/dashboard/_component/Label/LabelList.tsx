"use client";

import { useCallback } from "react";

import { LabelListItem } from "@/app/dashboard/_component/Label/LabelListItem";
import { Button } from "@/component/Button";

const labels = [
  { color: "#ea546c", id: "TypeScript", name: "TypeScript" },
  { color: "#53ea8c", id: "React", name: "React" },
];

export const LabelList = () => {
  const handleCreateLabel = useCallback(() => {
    // TODO：ラベル作成フォームを表示する
    alert("ラベル作成フォームを表示予定");
  }, []);

  return (
    <div className="space-y-2 p-4">
      <section className="flex items-center justify-between">
        <h1>ラベル</h1>
        <Button variant="solid" className="p-2" onClick={handleCreateLabel}>
          ラベルを作成
        </Button>
      </section>

      <ul className="divide-y divide-indigo-6 rounded-xl border border-indigo-6 dark:divide-indigodark-6 dark:border-indigodark-6">
        {labels.map((label) => {
          return (
            <li key={label.id} className="group">
              <LabelListItem {...label} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};
