import { ProfileForm } from "@/app/setting/profile/_component/ProfileForm";
import { createClient } from "@/lib/supabase/server";

const ProfileEdit = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return;
  }
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return (
    <div className="space-y-4 p-4">
      <h1 className="font-bold">プロフィール設定</h1>
      <ProfileForm user={user} profile={profile} />
    </div>
  );
};

export default ProfileEdit;
