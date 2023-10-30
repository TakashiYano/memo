import { LabelList } from "@/app/dashboard/_component/Label";
import { getProfile } from "@/lib/supabase/user";

export const metadata = {
  title: "Label",
};

const LabelPage = async () => {
  const profile = await getProfile();
  if (!profile) {
    return null;
  }

  return <LabelList profile={profile} />;
};

export default LabelPage;
