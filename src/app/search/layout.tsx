import { InputSearch } from "@/app/search/_component/SearchNav/InputSearch";

type SearchLayoutProps = { children: React.ReactNode };

const SearchLayout = async (props: SearchLayoutProps) => {
  const { children } = props;

  return (
    <>
      <InputSearch />
      {children}
    </>
  );
};

export default SearchLayout;
