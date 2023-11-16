"use client";

import { useState } from "react";

import { Accordion } from "@/component/Accordion";
import { type Label } from "@/lib/label/type";

type LibraryItemsQueryInput = {
  cursor?: string;
  limit: number;
  searchQuery?: string;
  sortDescending: boolean;
};

export const LabelAccordion = (props: { labels: Label[] }) => {
  const { labels } = props;
  const defaultQuery = {
    limit: 10,
    searchQuery: undefined,
    sortDescending: true,
  };
  const [queryInputs, setQueryInputs] = useState<LibraryItemsQueryInput>(defaultQuery);

  return (
    <Accordion
      labels={labels}
      searchTerm={queryInputs.searchQuery}
      applySearchQuery={(searchQuery: string) => {
        setQueryInputs({
          ...queryInputs,
          searchQuery,
        });
      }}
    />
  );
};
