import { InputSearch } from "@/app/search/_component/InputSearch";

const SearchLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="space-y-8 pb-20 pt-4 sm:space-y-14">
      <InputSearch />
      {children}
    </div>
  );
};

export default SearchLayout;
