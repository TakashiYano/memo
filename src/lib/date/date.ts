import { format } from "date-fns";

/** @package */
export const format_yyyyMd = (value: string | number | Date) => {
  return format(new Date(value), "yyyy/M/d");
};
