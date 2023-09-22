/* eslint-disable func-style */
import type { DOMAttributes } from "react";

type AllOrNone<T> = T | { [Key in keyof T]?: never };

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

/** @package */
export type { AllOrNone, ListProps };

/** @package */
export { hasButton, isLink };
