/* eslint-disable import/no-default-export */
/* eslint-disable func-style */
import type { NextPage } from "next";

import type { UserType } from "src/lib/user";
import { ProfileForm } from "src/pages-component/setting/profile";
import { Layout } from "src/pages-layout";

const user: UserType = {
  avatarUrl: "/mocks/avatar01.jpg",
  id: "engineer",
  name: "yanot",
};

const SettingMyUserEdit: NextPage = () => {
  return (
    <Layout left="back" center="account">
      <ProfileForm user={user} />
    </Layout>
  );
};

export default SettingMyUserEdit;
