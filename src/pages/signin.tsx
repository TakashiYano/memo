import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { ChevronLeft } from "src/components/icon/ChevronLeft";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/shared/Button";

const Signin: NextPage = () => {
  return (
    <div>
      <div className="bg-gray-200 w-screen h-screen">
        <Button button bgColor="transparent" className="absolute left-2">
          <ChevronLeft />
        </Button>
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center mb-16">Memo</div>
          <Button button bgColor="white" startIcon={<GoogleIcon />} size="large" className="w-80">
            Googleでログイン
          </Button>
          <Button button bgColor="black" startIcon={<AppleIcon iconColor="white" />} size="large" className="w-80">
            Appleでログイン
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Signin;
