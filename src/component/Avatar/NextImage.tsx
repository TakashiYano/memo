import type { ImageLoaderProps, ImageProps } from "next/image";
import Image from "next/image";
import type { FC } from "react";

const loader = ({ src, width, quality }: ImageLoaderProps) => {
  const url = new URL(src);
  url.searchParams.append("w", width.toString());
  url.searchParams.append("q", (quality || 75).toString());
  return url.toString();
};

const LoaderedImage: FC<Omit<ImageProps, "src"> & { src: string }> = (props) => {
  return <Image {...props} src={props.src} alt={props.alt} loader={loader} />;
};

/**
 * @package
 */
export const NextImage: FC<ImageProps> = (props) => {
  if (typeof props.src === "string") {
    return <LoaderedImage {...props} src={props.src} />;
  }
  return <Image {...props} alt={props.alt} />;
};
