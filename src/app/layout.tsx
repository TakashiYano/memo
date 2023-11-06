import { ThemeProviders } from "@/app/_component/Provider/ThemeProviders";

import "./globals.css";

import { Inter } from "next/font/google";

import { Footer } from "@/app/_component/Nav/Footer";
import { SideNav } from "@/app/_component/Nav/SideNav";
import { ToastProvider } from "@/app/_component/Provider/ToastProvider";
import { getLabels } from "@/lib/supabase/label";
import { getProfile } from "@/lib/supabase/user";

const inter = Inter({ subsets: ["latin"] });

const siteName = "Memo";
const description = "Memo pad app for constantly updated output";
const url = "https://memo-note.vercel.app/";

export const metadata = {
  alternates: {
    canonical: url,
  },
  description,
  title: {
    default: siteName,
    template: `%s - ${siteName}`,
  },
};

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const profile = await getProfile();
  const labels = await getLabels();

  return (
    <html lang="ja" suppressHydrationWarning className={inter.className}>
      <body className="min-h-screen bg-indigo-2 dark:bg-indigodark-2 md:mr-0 md:flex md:justify-center">
        <ThemeProviders>
          <ToastProvider>
            {profile && <SideNav profile={profile} labels={labels} />}
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
