import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { type LinkProps } from "next/link";

type Common = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonVariant = "outline" | "ghost" | "solid" | "error" | "ui";

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & Common;

type AnchorType = LinkProps & Common;

export type { AnchorType, ButtonType, ButtonVariant };
