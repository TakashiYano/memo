import { type DOMAttributes, type FC } from "react";

type LabelListItem = {
  color: string;
  id: string;
  name: string;
};

type MenuListItem = {
  label: LabelListItem;
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
};

type MenuDialogListProps = {
  menu: (MenuListItem[] | string | undefined)[];
};

export const MenuDialogList: FC<MenuDialogListProps> = (props) => {
  const { menu } = props;

  return (
    <div className="space-y-5">
      {menu.map((item, i) => {
        if (!item) {
          return null;
        }

        if (typeof item === "string") {
          return (
            <div key={i} className="font-bold">
              {item}
            </div>
          );
        }

        return (
          <ul key={i}>
            {item.map(({ label, onClick }) => {
              return (
                <li
                  key={label.id}
                  className="overflow-hidden first:rounded-t-2xl last:rounded-b-2xl"
                >
                  <button
                    className="flex w-full items-center gap-x-2 bg-indigo-3 px-6 py-3 text-left hover:bg-indigo-4 focus:outline-none active:bg-indigo-5 dark:bg-indigodark-3 dark:hover:bg-indigodark-4 dark:active:bg-indigodark-5"
                    onClick={onClick}
                  >
                    <div
                      className="h-5 w-5 rounded-full border-none"
                      style={{ backgroundColor: `${label.color}` }}
                    />
                    <span className="text-xs text-indigo-12 dark:text-indigodark-12">
                      {label.name}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        );
      })}
    </div>
  );
};
