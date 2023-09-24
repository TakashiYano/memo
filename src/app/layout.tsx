import { Toaster } from "react-hot-toast";

import { ThemeProviders } from "@/app/_component/ThemeProviders";

import "./globals.css";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className="dark:bg-gray-800">
        <ThemeProviders>
          {children}
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
