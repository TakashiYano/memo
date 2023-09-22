import type { NextPage } from "next";
import { ProfileForm } from "src/pages-component/setting/my/user/edit";
import { Layout } from "src/pages-layout/Layout";

const SettingMyUserNew: NextPage = () => {
  return (
    <Layout center="account">
      <ProfileForm />
    </Layout>
  );
};

export default SettingMyUserNew;
