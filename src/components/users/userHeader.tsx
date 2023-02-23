import { SearchIcon } from "src/components/icon/SearchIcon";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { InputText } from "src/components/shared/InputText";
import { EXAMPLE_USER_01 } from "src/models/user";

export const UserHeader = () => {
  const user = EXAMPLE_USER_01;
  return (
    <div className="flex flex-row items-center">
      <div className="flex-1">
        <div className="mr-4 flex justify-end">Memo</div>
      </div>
      <div className="my-auto mx-16 flex-1">
        <InputText startIcon={<SearchIcon className="my-auto mr-2 h-6 w-6" />} placeholder="メモを検索する" />
      </div>
      <div className="flex-1">
        <div className="flex flex-row">
          <div className="ml-4">
            <Button button>メモを書く</Button>
          </div>
          <div className="my-auto">
            <Avatar alt={user.name} src={user.avatarUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};
