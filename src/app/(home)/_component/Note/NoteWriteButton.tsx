"use client";

import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { toast } from "react-hot-toast";

import { Button } from "@/component/Button/Button";
import { ICON_SIZE } from "@/lib/const/constants";
import { isNoteType } from "@/lib/memo/type";
import { type Database } from "@/lib/supabase/type";
import { type NoteWriteType } from "@/lib/user/type";

export const NoteWriteButton = (props: NoteWriteType) => {
  const { user } = props;
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCreateMemo = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await supabase
        .from("memo_notes")
        .insert({ user_id: user.id })
        .select()
        .single();
      if (!isNoteType(data)) {
        throw new Error("Failed to create memo");
      }
      await router.push(`/memo/${data.id}`);
    } catch (error) {
      toast.error("メモの作成に失敗しました。時間を空けてから再度お試しください。");
      setIsLoading(false);
      console.error(error);
    }
  }, [router, supabase, user]);

  return (
    <Button
      key="write memo"
      className={ICON_SIZE}
      variant="ghost"
      onClick={handleCreateMemo}
      disabled={isLoading}
    >
      <PencilSquareIcon className="h-5 w-5" />
    </Button>
  );
};
