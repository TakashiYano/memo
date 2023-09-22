/* eslint-disable func-style */
import type { FC } from "react";

import { List } from "./List";
import type { ListProps } from "./type";

type RecursiveListProps = {
  list: [ListProps, ...ListProps[]];
};

export const RecursiveList: FC<RecursiveListProps> = (props) => {
  const { list } = props;

  return (
    <ul className="space-y-8">
      {list.map((listItems, i) => {
        return (
          <li key={i}>
            <List {...listItems} />
          </li>
        );
      })}
    </ul>
  );
};
