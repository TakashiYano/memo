import { cookies } from "next/headers";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

import { ProfileForm } from "@/app/(home)/setting/profile/_component/ProfileForm";
import { type Database } from "@/lib/supabase/type";

const ProfileEdit = async () => {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="space-y-4">
      <h1 className="font-bold">プロフィール設定</h1>
      <ProfileForm user={user} profile={profile} />
    </div>
  );
};

export default ProfileEdit;
