import { ProfileForm } from "@/app/(home)/setting/profile/_component/ProfileForm";
import { type UserType } from "@/lib/user";

const user: UserType = {
  avatarUrl: "/mocks/avatar01.jpg",
  id: "engineer",
  name: "yanot",
};

const ProfileEdit = () => {
  return <ProfileForm user={user} />;
};

export default ProfileEdit;
