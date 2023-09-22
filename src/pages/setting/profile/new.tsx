/* eslint-disable import/no-default-export */
/* eslint-disable func-style */
import type { NextPage } from "next";

import { ProfileForm } from "src/pages-component/setting/profile";
import { Layout } from "src/pages-layout";

const SettingMyUserNew: NextPage = () => {
  return (
    <Layout center="account">
      <ProfileForm />
    </Layout>
  );
};

export default SettingMyUserNew;
