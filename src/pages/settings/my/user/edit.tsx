import type { NextPage } from "next";
import type { UserType } from "src/api/handler/user/type";
import { ProfileForm } from "src/components/shared/ProfileForm";
import { Layout } from "src/pages-layout";

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
