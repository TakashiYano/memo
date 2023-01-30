import Link from "next/link";
import type { FC } from "react";
import { Avatar } from "src/components/shared/Avatar";
import { Button } from "src/components/shared/Button";
import { EXAMPLE_USER_01 } from "src/models/user";

const user = EXAMPLE_USER_01;

export const Header: FC = () => {
  return (
    <header>
      <div className="flex items-center px-4 mx-auto max-w-screen-lg">
        <Link href="/" legacyBehavior>
          <a>Memo</a>
        </Link>
        <div className="flex items-center ml-auto space-x-2">
          <Button linkProps={{ href: "/notes/new" }}>メモを書く</Button>
          <Link href="/users/foo" legacyBehavior>
            <a>
              <Avatar alt={user.name} src={user.avatarUrl} className="w-10 h-10" />
            </a>
          </Link>
        </div>
      </div>
    </header>
  );
};
