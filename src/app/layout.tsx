import { Toaster } from "react-hot-toast";

import { ThemeProviders } from "@/app/_component/ThemeProviders";

import "./globals.css";

import { Footer } from "@/app/(home)/_component/TopBar/Footer";
import { SideNav } from "@/app/(home)/_component/TopBar/SideNav";
import { createClient } from "@/lib/supabase/server";

const getProfile = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (user) {
    const { data: profile } = await supabase.from("profiles").select().eq("id", user.id).single();
    return profile;
  }
  return null;
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getProfile();

  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="min-h-screen bg-indigo-2 dark:bg-indigodark-2 md:mr-0 md:flex md:justify-center">
        <ThemeProviders>
          {profile && <SideNav profile={profile} />}
          <main className="relative block h-auto min-h-screen items-center bg-indigo-1 pb-14 dark:bg-indigodark-1 md:w-[480px]  md:max-w-[480px] md:border-x-[1px] md:border-indigo-6 md:pb-[8px] dark:md:border-indigodark-6 lg:mr-[241px]">
            {children}
            {profile && <Footer profile={profile} />}
          </main>
          <Toaster
            toastOptions={{
              className: "!rounded-full !py-1 !px-2.5 !text-sm font-bold",
              duration: 2500,
            }}
          />
        </ThemeProviders>{" "}
      </body>
    </html>
  );
};

export default RootLayout;
