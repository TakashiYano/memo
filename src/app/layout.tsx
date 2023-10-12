import { ThemeProviders } from "@/app/_component/Provider/ThemeProviders";

import "./globals.css";

import { Inter } from "next/font/google";

import { Footer } from "@/app/_component/Nav/Footer";
import { SideNav } from "@/app/_component/Nav/SideNav";
import { ToastProvider } from "@/app/_component/Provider/ToastProvider";
import { createClient } from "@/lib/supabase/server";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="ja" suppressHydrationWarning className={inter.className}>
      <body className="min-h-screen bg-indigo-2 dark:bg-indigodark-2 md:mr-0 md:flex md:justify-center">
        <ThemeProviders>
          <ToastProvider>
            {profile && <SideNav profile={profile} />}
            <main className="relative block h-auto min-h-screen items-center bg-indigo-1 pb-14 dark:bg-indigodark-1 md:w-[480px]  md:max-w-[480px] md:border-x-[1px] md:border-indigo-6 md:pb-[8px] dark:md:border-indigodark-6 lg:mr-[241px]">
              {children}
              {profile && <Footer profile={profile} />}
            </main>
          </ToastProvider>
        </ThemeProviders>{" "}
      </body>
    </html>
  );
};

export default RootLayout;
