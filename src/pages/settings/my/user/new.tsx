import type { NextPage } from "next";
import { ProfileForm } from "src/components/shared/ProfileForm";
import { Layout } from "src/pages-layout";

const SettingsQinUserNew: NextPage = () => {
  return (
    <Layout center="account">
      <ProfileForm />
    </Layout>
  );
};

export default SettingsQinUserNew;
