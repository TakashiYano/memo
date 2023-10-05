import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { type LinkProps } from "next/link";

type ButtonVariant = "outline" | "ghost" | "solid" | "error" | "ui";

type CommonSchema = {
  children: ReactNode;
  className?: string;
  variant?: ButtonVariant;
};

type ButtonType = ButtonHTMLAttributes<HTMLButtonElement> & CommonSchema;

type AnchorType = LinkProps & CommonSchema;

export type { AnchorType, ButtonType, ButtonVariant };
