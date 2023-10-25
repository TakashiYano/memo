import { DashboardNav } from "@/app/dashboard/_component/Common";

type DashboardLayoutProps = { children: React.ReactNode };

const DashboardLayout = (props: DashboardLayoutProps) => {
  const { children } = props;

  return (
    <>
      <DashboardNav />
      {children}
    </>
  );
};

export default DashboardLayout;
