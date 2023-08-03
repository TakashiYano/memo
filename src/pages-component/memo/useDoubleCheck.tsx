import { useState } from "react";

const callAll = <Args extends Array<unknown>>(...fns: Array<((...args: Args) => unknown) | undefined>) => {
  return (...args: Args) => {
    return fns.forEach((fn) => {
      return fn?.(...args);
    });
  };
};

/**@package */
export const useDoubleCheck = () => {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const [doubleCheck, setDoubleCheck] = useState(false);

  const getButtonProps = (props?: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    const onBlur: React.ButtonHTMLAttributes<HTMLButtonElement>["onBlur"] = () => {
      return setDoubleCheck(false);
    };

    const onClick: React.ButtonHTMLAttributes<HTMLButtonElement>["onClick"] = doubleCheck
      ? undefined
      : (e) => {
          e.preventDefault();
          setDoubleCheck(true);
        };

    return {
      ...props,
      onBlur: callAll(onBlur, props?.onBlur),
      onClick: callAll(onClick, props?.onClick),
    };
  };
  return { doubleCheck, getButtonProps };
};
