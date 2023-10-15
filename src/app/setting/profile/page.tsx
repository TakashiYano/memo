import { redirect } from "next/navigation";

import { ProfileForm } from "@/app/setting/_component/Profile/ProfileForm";
import { getProfile, getUser } from "@/lib/supabase/user";

export const metadata = {
  title: "Profile",
};

const ProfilePage = async () => {
  const userPromise = await getUser();
  const profilePromise = getProfile();
  const [user, profile] = await Promise.all([userPromise, profilePromise]);

  if (!user) {
    redirect("/signin");
  }

  return <ProfileForm user={user} profile={profile} />;
};

export default ProfilePage;
