import { type ImgHTMLAttributes } from "react";
import { type ImageProps as NextImageProps } from "next/image";

type BlobImage = ImgHTMLAttributes<HTMLImageElement>;

type ImageProps = (BlobImage | NextImageProps) & { noDialog?: boolean };

export type ImagePropsSrcUndefinedable = Omit<ImageProps, "src"> & { src?: ImageProps["src"] };

export const hasSrc = (props: ImagePropsSrcUndefinedable): props is ImageProps => {
  return !!props.src;
};

export const isBlob = (props: ImageProps): props is BlobImage => {
  return typeof props.src === "string" && props.src.startsWith("blob");
};
