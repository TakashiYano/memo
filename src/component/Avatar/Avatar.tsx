"use client";

import { type FC } from "react";
import Image from "next/image";

import NoProfileImage from "public/no-profile-image.webp";
import { tv } from "tailwind-variants";

import { DialogImage } from "./DialogImage";
import { NextImage } from "./NextImage";
import { hasSrc, isBlob, type ImagePropsSrcUndefinedable } from "./types";

const button = tv({
  base: "object-cover object-center overflow-hidden rounded-full",
});

export const Avatar: FC<ImagePropsSrcUndefinedable> = (props) => {
  const { className, noDialog, ...rest } = props;
  const classes = button({ class: className });

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
    <DialogImage
      src={typeof rest.src === "string" ? rest.src : "/no-profile-image.webp"}
      alt={rest.alt}
    >
      <NextImage {...rest} className={classes} />
    </DialogImage>
  );
};
