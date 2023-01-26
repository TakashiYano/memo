/* eslint-disable @typescript-eslint/naming-convention */
import cc from "classcat";
import type { FC } from "react";

type Props = {
  className?: string;
  size?: "large" | "small";
  iconColor?: "white" | "black";
  disabled?: boolean;
};

export const TwitterIcon: FC<Props> = (props) => {
  const classes = cc([
    {
      "w-8 h-8": props.size === "large",
      "w-6 h-6": props.size === "small",
      "text-gray-500": props.disabled,
      "text-blue-400": !props.disabled,
    },
    props.className,
  ]);

  return (
    <svg className={classes} width="24" height="20" viewBox="0 0 24 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <mask id="path-1-inside-1" fill="white">
        <path d="M7.54752 19.5012C16.6042 19.5012 21.5578 11.9979 21.5578 5.49101C21.5578 5.27789 21.5578 5.06573 21.5434 4.85453C22.507 4.15748 23.3389 3.29441 24 2.30573C23.1013 2.70394 22.148 2.96508 21.1718 3.08045C22.1998 2.46507 22.9691 1.49719 23.3366 0.356928C22.3701 0.930485 21.3126 1.3347 20.2099 1.55213C19.4675 0.762705 18.4856 0.23997 17.4162 0.0648127C16.3468 -0.110344 15.2494 0.071843 14.294 0.583181C13.3385 1.09452 12.5782 1.9065 12.1307 2.89348C11.6833 3.88045 11.5735 4.98739 11.8186 6.04301C9.86088 5.94486 7.94572 5.43613 6.19741 4.54981C4.4491 3.6635 2.90672 2.41943 1.6704 0.898368C1.04073 1.98236 0.847872 3.2656 1.1311 4.48679C1.41433 5.70798 2.15234 6.77532 3.19488 7.47149C2.41127 7.44826 1.64475 7.23688 0.96 6.85517C0.96 6.87533 0.96 6.89645 0.96 6.91757C0.960311 8.05442 1.35385 9.15616 2.07387 10.0359C2.79389 10.9157 3.79606 11.5193 4.9104 11.7444C4.18547 11.9421 3.42488 11.9711 2.68704 11.8289C3.00169 12.8073 3.61427 13.6629 4.43911 14.276C5.26395 14.8892 6.25979 15.2291 7.28736 15.2484C5.54375 16.6188 3.38982 17.3627 1.17216 17.3604C0.780387 17.3597 0.388996 17.336 0 17.2894C2.25181 18.7345 4.87192 19.501 7.54752 19.4974" />
      </mask>
      <path
        d="M7.54752 19.5012C16.6042 19.5012 21.5578 11.9979 21.5578 5.49101C21.5578 5.27789 21.5578 5.06573 21.5434 4.85453C22.507 4.15748 23.3389 3.29441 24 2.30573C23.1013 2.70394 22.148 2.96508 21.1718 3.08045C22.1998 2.46507 22.9691 1.49719 23.3366 0.356928C22.3701 0.930485 21.3126 1.3347 20.2099 1.55213C19.4675 0.762705 18.4856 0.23997 17.4162 0.0648127C16.3468 -0.110344 15.2494 0.071843 14.294 0.583181C13.3385 1.09452 12.5782 1.9065 12.1307 2.89348C11.6833 3.88045 11.5735 4.98739 11.8186 6.04301C9.86088 5.94486 7.94572 5.43613 6.19741 4.54981C4.4491 3.6635 2.90672 2.41943 1.6704 0.898368C1.04073 1.98236 0.847872 3.2656 1.1311 4.48679C1.41433 5.70798 2.15234 6.77532 3.19488 7.47149C2.41127 7.44826 1.64475 7.23688 0.96 6.85517C0.96 6.87533 0.96 6.89645 0.96 6.91757C0.960311 8.05442 1.35385 9.15616 2.07387 10.0359C2.79389 10.9157 3.79606 11.5193 4.9104 11.7444C4.18547 11.9421 3.42488 11.9711 2.68704 11.8289C3.00169 12.8073 3.61427 13.6629 4.43911 14.276C5.26395 14.8892 6.25979 15.2291 7.28736 15.2484C5.54375 16.6188 3.38982 17.3627 1.17216 17.3604C0.780387 17.3597 0.388996 17.336 0 17.2894C2.25181 18.7345 4.87192 19.501 7.54752 19.4974"
        fill="currentColor"
      />
      <path
        d="M21.5434 4.85453L21.0061 4.11179L20.5942 4.40972L20.6288 4.91688L21.5434 4.85453ZM24 2.30573L24.762 2.81526L26.5197 0.186606L23.6286 1.46765L24 2.30573ZM21.1718 3.08045L20.701 2.29395L21.2794 3.99078L21.1718 3.08045ZM23.3366 0.356928L24.2091 0.638164L24.9524 -1.66777L22.8689 -0.431395L23.3366 0.356928ZM20.2099 1.55213L19.5422 2.18012L19.8896 2.5496L20.3873 2.45148L20.2099 1.55213ZM11.8186 6.04301L11.7727 6.95852L12.9862 7.01936L12.7115 5.83575L11.8186 6.04301ZM1.6704 0.898368L2.38173 0.320196L1.5445 -0.709869L0.877758 0.437938L1.6704 0.898368ZM3.19488 7.47149L3.16772 8.38775L6.35935 8.48235L3.70393 6.70916L3.19488 7.47149ZM0.96 6.85517L1.40633 6.0545L0.0433333 5.29471V6.85517H0.96ZM0.96 6.91757H0.0433333L0.0433334 6.91782L0.96 6.91757ZM4.9104 11.7444L5.15159 12.6288L5.09191 10.8459L4.9104 11.7444ZM2.68704 11.8289L2.86042 10.9288L1.34051 10.636L1.81439 12.1096L2.68704 11.8289ZM7.28736 15.2484L7.85379 15.9692L9.87555 14.3802L7.30457 14.3319L7.28736 15.2484ZM1.17216 17.3604L1.1704 18.2771L1.17124 18.2771L1.17216 17.3604ZM0 17.2894L0.108957 16.3792L-0.495082 18.0609L0 17.2894ZM7.54752 20.4179C17.2157 20.4179 22.4744 12.3921 22.4744 5.49101H20.6411C20.6411 11.6037 15.9927 18.5846 7.54752 18.5846V20.4179ZM22.4744 5.49101C22.4744 5.2832 22.4748 5.03974 22.4579 4.79217L20.6288 4.91688C20.6407 5.09172 20.6411 5.27258 20.6411 5.49101H22.4744ZM22.0806 5.59726C23.1324 4.83644 24.0404 3.8944 24.762 2.81526L23.238 1.7962C22.6374 2.69442 21.8816 3.47852 21.0061 4.11179L22.0806 5.59726ZM23.6286 1.46765C22.8138 1.82872 21.9494 2.06551 21.0643 2.17012L21.2794 3.99078C22.3466 3.86465 23.3889 3.57915 24.3714 3.1438L23.6286 1.46765ZM21.6427 3.86695C22.8613 3.1374 23.7733 1.98996 24.2091 0.638164L22.4642 0.0756925C22.1648 1.00441 21.5382 1.79274 20.701 2.29395L21.6427 3.86695ZM22.8689 -0.431395C21.9921 0.0888821 21.0329 0.455548 20.0326 0.652778L20.3873 2.45148C21.5924 2.21385 22.7481 1.77209 23.8044 1.14525L22.8689 -0.431395ZM20.8777 0.924138C19.9972 -0.0121084 18.8327 -0.632067 17.5644 -0.839801L17.268 0.969426C18.1386 1.11201 18.9378 1.53752 19.5422 2.18012L20.8777 0.924138ZM17.5644 -0.839801C16.296 -1.04753 14.9946 -0.831463 13.8614 -0.225022L14.7265 1.39138C15.5043 0.975149 16.3975 0.826846 17.268 0.969426L17.5644 -0.839801ZM13.8614 -0.225022C12.7283 0.381419 11.8266 1.34442 11.2959 2.51496L12.9656 3.27199C13.3299 2.46858 13.9488 1.80762 14.7265 1.39138L13.8614 -0.225022ZM11.2959 2.51496C10.7652 3.6855 10.635 4.99832 10.9256 6.25027L12.7115 5.83575C12.512 4.97647 12.6014 4.0754 12.9656 3.27199L11.2959 2.51496ZM11.8645 5.12749C10.0351 5.03578 8.24557 4.5604 6.6119 3.73221L5.78293 5.36742C7.64588 6.31185 9.68662 6.85395 11.7727 6.95852L11.8645 5.12749ZM6.6119 3.73221C4.97823 2.90402 3.53699 1.74152 2.38173 0.320196L0.959067 1.47654C2.27646 3.09735 3.91998 4.42299 5.78293 5.36742L6.6119 3.73221ZM0.877758 0.437938C0.130952 1.72358 -0.0977797 3.24553 0.238135 4.69389L2.02406 4.27969C1.79352 3.28566 1.9505 2.24114 2.46304 1.3588L0.877758 0.437938ZM0.238135 4.69389C0.574049 6.14226 1.44935 7.40815 2.68583 8.23382L3.70393 6.70916C2.85533 6.1425 2.2546 5.27371 2.02406 4.27969L0.238135 4.69389ZM3.22204 6.55522C2.5854 6.53635 1.96265 6.36462 1.40633 6.0545L0.513673 7.65584C1.32685 8.10914 2.23714 8.36017 3.16772 8.38775L3.22204 6.55522ZM0.0433333 6.85517C0.0433333 6.87309 0.0433333 6.89869 0.0433333 6.91757H1.87667C1.87667 6.89869 1.87667 6.87309 1.87667 6.85517H0.0433333ZM0.0433334 6.91782C0.0437023 8.26623 0.510479 9.57301 1.36449 10.6165L2.78325 9.45537C2.19722 8.73932 1.87692 7.8426 1.87667 6.91732L0.0433334 6.91782ZM1.36449 10.6165C2.21851 11.66 3.40718 12.376 4.72889 12.643L5.09191 10.8459C4.18495 10.6627 3.36928 10.1714 2.78325 9.45537L1.36449 10.6165ZM4.66921 10.8601C4.07946 11.0209 3.46068 11.0444 2.86042 10.9288L2.51366 12.729C3.38907 12.8977 4.29149 12.8634 5.15159 12.6288L4.66921 10.8601ZM1.81439 12.1096C2.18755 13.2699 2.91404 14.2846 3.89226 15.0117L4.98596 13.5404C4.3145 13.0412 3.81583 12.3448 3.55969 11.5483L1.81439 12.1096ZM3.89226 15.0117C4.87047 15.7389 6.0515 16.1421 7.27015 16.165L7.30457 14.3319C6.46808 14.3162 5.65742 14.0395 4.98596 13.5404L3.89226 15.0117ZM6.72093 14.5277C5.13909 15.7709 3.18499 16.4458 1.17308 16.4438L1.17124 18.2771C3.59464 18.2796 5.94841 17.4666 7.85379 15.9692L6.72093 14.5277ZM1.17392 16.4438C0.817979 16.4431 0.462382 16.4215 0.108957 16.3792L-0.108957 18.1996C0.31561 18.2504 0.742796 18.2763 1.1704 18.2771L1.17392 16.4438ZM-0.495082 18.0609C1.9048 19.601 4.6972 20.4179 7.54874 20.4141L7.5463 18.5807C5.04663 18.5841 2.59882 17.868 0.495082 16.5179L-0.495082 18.0609Z"
        fill="currentColor"
        mask="url(#path-1-inside-1)"
      />
    </svg>
  );
};

// Propsのデフォルト値
TwitterIcon.defaultProps = {
  className: "",
  size: "small",
};
