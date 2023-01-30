import type { FC, ReactNode } from "react";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";

export const Layout: FC<{ children: ReactNode }> = (props) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 bg-gray-200 dark:bg-gray-700">{props.children}</main>
      <Footer />
    </div>
  );
};
