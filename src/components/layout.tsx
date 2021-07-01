import type { ReactNode, VFC } from "react";
import { Footer } from "src/components/footer";
import { Header } from "src/components/header";

export const Layout: VFC<{ children: ReactNode }> = (props) => {
  return (
    <>
      <Header />
      <main className="bg-red-100 dark:bg-gray-700">{props.children}</main>
      <Footer />
    </>
  );
};
