import { AllInputSearch } from "@/app/(home)/_component/AllInputSearch";

type HomeLayoutProps = { children: React.ReactNode };

const HomeLayout = async (props: HomeLayoutProps) => {
  const { children } = props;
  return (
    <>
      <AllInputSearch />
      {children}
    </>
  );
};

export default HomeLayout;
