import type { NextPage } from "next";
import type { UserType } from "src/api/handler/user/type";
import { ProfileForm } from "src/pages-component/setting/my/user/edit";
import { Layout } from "src/pages-layout/Layout";

const user: UserType = {
  id: "engineer",
  name: "yanot",
  avatarUrl: "/mocks/avatar01.jpg",
};

const SettingMyUserEdit: NextPage = () => {
  return (
    <Layout left="back" center="account">
      <ProfileForm user={user} />
    </Layout>
  );
};

export default SettingMyUserEdit;
