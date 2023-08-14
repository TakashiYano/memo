import { Interweave } from "interweave";
import { UrlMatcher } from "interweave-autolink";
import Link from "next/link";
import type { NoteWithUserType } from "src/api/handler/note/type";
import { Avatar } from "src/component/Avatar";

export const NoteViewer = (props: NoteWithUserType) => {
  return (
    <div className="space-y-7">
      <Link href={`/user/${props.users.name}`} legacyBehavior>
        <a className="flex w-max items-center space-x-4">
          <Avatar
            src={props.users.avatarUrl}
            alt={props.users.name}
            width={64}
            height={64}
            className="h-16 w-16 overflow-hidden rounded-full"
            noDialog
          />
          <div className="flex flex-col">
            <span className="font-bold">{props.users.name}</span>
          </div>
        </a>
      </Link>
      <p className="whitespace-pre-wrap text-lg leading-loose">
        <Interweave
          content={props.content}
          matchers={[
            new UrlMatcher("url", { validateTLD: false }, (urlProps) => {
              return (
                <a
                  href={urlProps.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer text-blue-400 underline"
                >
                  {urlProps.children}
                </a>
              );
            }),
          ]}
        />
      </p>
    </div>
  );
};
