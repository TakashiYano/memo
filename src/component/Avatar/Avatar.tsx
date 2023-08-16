/* eslint-disable @next/next/no-img-element */
import cc from "classcat";
import Image from "next/image";
import NoProfileImage from "public/no-profile-image.webp";
import type { FC } from "react";

import { DialogImage } from "./DialogImage";
import { NextImage } from "./NextImage";
import type { ImagePropsSrcUndefinedable } from "./types";
import { hasSrc, isBlob } from "./types";

/**@package */
export const Avatar: FC<ImagePropsSrcUndefinedable> = (props) => {
  // eslint-disable-next-line react/destructuring-assignment
  const { noDialog, className, ...rest } = props;
  const classes = cc(["object-cover object-center overflow-hidden rounded-full", className]);

  if (!hasSrc(rest)) {
    return (
      <div className={classes}>
        <Image src={NoProfileImage} alt="No Profile Image" placeholder="blur" />
      </div>
    );
  }

  if (isBlob(rest)) {
    return <img {...rest} className={classes} alt={rest.alt} />;
  }

  if (noDialog) {
    return <NextImage {...rest} className={classes} />;
  }

  return (
    <DialogImage src={typeof rest.src === "string" ? rest.src : "/no-profile-image.webp"} alt={rest.alt}>
      <NextImage {...rest} className={classes} />
    </DialogImage>
  );
};
