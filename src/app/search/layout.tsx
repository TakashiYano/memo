import { SearchHeader } from "@/app/search/_component/SearchHeader";

const SearchLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-8 pb-20 pt-4 sm:space-y-14">
      <SearchHeader />
      <main className="mx-auto w-full max-w-screen-sm px-4">{children}</main>
    </div>
  );
};

export default SearchLayout;
