/* eslint-disable func-style */
import { useEffect } from "react";

export const useAddClassToBodyElem = (className: string) => {
  useEffect(() => {
    document.body.classList.add(className);
  }, [className]);
};
