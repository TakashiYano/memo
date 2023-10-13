import { redirect } from "next/navigation";

import { ProfileForm } from "@/app/setting/_component/Profile/ProfileForm";
import { createClient } from "@/lib/supabase/server";

export const metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect("/signin");
  }
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  return <ProfileForm user={user} profile={profile} />;
};

export default ProfilePage;
