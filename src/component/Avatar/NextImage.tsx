import type { FC } from "react";
import Image, { type ImageLoaderProps, type ImageProps } from "next/image";

const loader = ({ quality, src, width }: ImageLoaderProps) => {
  const url = new URL(src);
  url.searchParams.append("w", width.toString());
  url.searchParams.append("q", (quality || 75).toString());
  return url.toString();
};

const LoaderedImage: FC<Omit<ImageProps, "src"> & { src: string }> = (props) => {
  const { alt, src } = props;
  return <Image {...props} src={src} alt={alt} loader={loader} />;
};

export const NextImage: FC<ImageProps> = (props) => {
  const { alt, src } = props;
  if (typeof src === "string") {
    return <LoaderedImage {...props} src={src} />;
  }
  return <Image {...props} alt={alt} />;
};
