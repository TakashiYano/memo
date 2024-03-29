import { type DOMAttributes } from "react";

type Link = {
  href: string;
  label: string | JSX.Element;
};

type ComponentButton = { button: JSX.Element; label: string | JSX.Element };

type AllButton = {
  label: string | JSX.Element;
  onClick: DOMAttributes<HTMLButtonElement>["onClick"];
};

type Button = ComponentButton | AllButton;

type ListItem = Link | Button;

type ListProps = { items: [ListItem, ...ListItem[]]; title?: string | JSX.Element };

const isLink = (item: ListItem): item is Link => {
  return "href" in item;
};

const hasButton = (item: Button): item is ComponentButton => {
  return "button" in item;
};

export type { ListProps };

export { hasButton, isLink };
