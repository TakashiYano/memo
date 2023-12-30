import { ThemeProviders } from "@/app/_component/Provider/ThemeProviders";

import "./globals.css";

import { inter } from "@/app/_component/fonts";
import { Footer } from "@/app/_component/Nav/Footer";
import { SideNav } from "@/app/_component/Nav/SideNav";
import { ToastProvider } from "@/app/_component/Provider/ToastProvider";

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${inter.className} bg-indigo-2 antialiased dark:bg-indigodark-2 md:flex md:justify-center`}
      >
        <ThemeProviders>
          <ToastProvider>
            <SideNav />
            <main className="min-h-screen bg-indigo-1 pb-4 dark:bg-indigodark-1 md:w-[480px] md:max-w-[480px] md:border-x-2 md:border-indigo-6 md:pb-2 md:dark:border-indigodark-6 lg:mr-60">
              {children}
              <Footer />
            </main>
          </ToastProvider>
        </ThemeProviders>
      </body>
    </html>
  );
};

export default RootLayout;
