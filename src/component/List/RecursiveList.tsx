import { type FC } from "react";

import { type ListProps } from "@/component/List/type";

import { List } from "./List";

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
