import { LabelList } from "@/app/dashboard/_component/Label";
import { getLabels } from "@/lib/supabase/label";
import { getProfile } from "@/lib/supabase/user";

export const metadata = {
  title: "Label",
};

export const fetchCache = "default-no-store";

const LabelPage = async () => {
  const profile = await getProfile();
  if (!profile) {
    return null;
  }

  const labels = await getLabels();

  return <LabelList profile={profile} labels={labels} />;
};

export default LabelPage;
