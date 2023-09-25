import { ProfileForm } from "@/app/(home)/setting/profile/_component/ProfileForm";
import { type UserType } from "@/lib/user/type";

const user: UserType = {
  avatarUrl: "/mocks/avatar01.jpg",
  id: "engineer",
  name: "yanot",
};

const ProfileEdit = () => {
  return (
    <div className="px-4">
      <ProfileForm user={user} />
    </div>
  );
};

export default ProfileEdit;
