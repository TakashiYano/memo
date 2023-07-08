import type { FC } from "react";

import { List } from "./List";
import type { ListProps } from "./type";

type RecursiveListProps = {
  list: [ListProps, ...ListProps[]];
};

/** @package */
export const RecursiveList: FC<RecursiveListProps> = (props) => {
  return (
    <ul className="space-y-8">
      {props.list.map((listItems, i) => {
        return (
          <li key={i}>
            <List {...listItems} />
          </li>
        );
      })}
    </ul>
  );
};
