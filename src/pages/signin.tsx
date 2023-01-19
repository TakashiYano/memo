import Head from "next/head";
import type { FC } from "react";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/share/Button";

const Signin: FC = () => {
  return (
    <div>
      <Head>
        <title>Signin</title>;
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-200 w-screen h-screen">
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center mb-16">Memo</div>
          <Button type="button" id="googleButton" color="white" StartIcon={GoogleIcon} size="large" className="w-80">
            Googleでアカウント作成
          </Button>
          <Button type="button" id="appleButton" color="black" StartIcon={AppleIcon} size="large" className="w-80">
            Appleでアカウント作成
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
