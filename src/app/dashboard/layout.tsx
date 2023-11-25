import { HeaderNav } from "@/app/_component/Nav/HeaderNav";

type DashboardLayoutProps = { children: React.ReactNode };

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;

  return (
    <>
      <HeaderNav lists={[{ body: "ラベル", href: "/dashboard/label" }]} />
      {children}
    </>
  );
};

export default DashboardLayout;
