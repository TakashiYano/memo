import type { NextPage } from "next";
import { ProfileForm } from "src/components/shared/ProfileForm";
import { Layout } from "src/pages-layout/Layout";

const SettingsQinUserNew: NextPage = () => {
  return (
    <Layout center="account">
      <ProfileForm />
    </Layout>
  );
};

export default SettingsQinUserNew;
