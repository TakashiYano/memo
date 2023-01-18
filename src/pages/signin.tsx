import Head from "next/head";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/share/Button";

const Signin: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Signin</title>;
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-200 w-screen h-screen">
        <div className="flex justify-center mb-16">Memo</div>
        <Button id="googleButton" color="white" StartIcon={GoogleIcon} size="large">
          Googleでアカウント作成
        </Button>
        <Button id="appleButton" color="black" StartIcon={AppleIcon} size="large">
          Appleでアカウント作成
        </Button>
      </div>
    </div>
  );
};

export default Signin;
