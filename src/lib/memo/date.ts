import { format } from "date-fns";

export const format_yyyyMd = (value: string | number | Date) => {
  return format(new Date(value), "yyyy/M/d");
};

export const format_hhmma = (value: string | number | Date) => {
  return format(new Date(value), "hh:mma");
};
