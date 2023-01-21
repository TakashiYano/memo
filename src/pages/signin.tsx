import Head from "next/head";
import type { FC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/share/Button";

const Signin: FC = () => {
  return (
    <div>
      <Head>
        <title>Signin</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-200 w-screen h-screen">
        <Button button id="backButton" bgColor="transparent" className="absolute left-2">
          <ChevronLeft />
        </Button>
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center mb-16">Memo</div>
          <Button button id="googleButton" bgColor="white" startIcon={<GoogleIcon />} size="large" className="w-80">
            Googleでアカウント作成
          </Button>
          <Button button id="appleButton" bgColor="black" startIcon={<AppleIcon />} size="large" className="w-80">
            Appleでアカウント作成
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
