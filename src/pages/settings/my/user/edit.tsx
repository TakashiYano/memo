import type { NextPage } from "next";
import type { UserType } from "src/api/handler/user/type";
import { Layout } from "src/components/shared/Layout";
import { ProfileForm } from "src/components/shared/ProfileForm";

const user: UserType = {
  id: "engineer",
  name: "yanot",
  avatarUrl: "/mocks/avatar01.jpg",
};

const SettingsQinUserEdit: NextPage = () => {
  return (
    <Layout left="back" center="account">
      <ProfileForm user={user} />
    </Layout>
  );
};

export default SettingsQinUserEdit;
