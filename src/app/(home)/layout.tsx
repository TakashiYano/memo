import { Footer } from "@/app/(home)/_component/TopBar/Footer";
import { Header } from "@/app/(home)/_component/TopBar/Header";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-8 pb-20 pt-4 sm:space-y-14">
      <Header />
      <main className="mx-auto w-full max-w-screen-sm">
        {children}
        <Footer />
      </main>
    </div>
  );
};

export default HomeLayout;
