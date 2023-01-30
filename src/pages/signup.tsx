import { ChevronLeftIcon } from "@heroicons/react/24/outline";
import type { NextPage } from "next";
import { AppleIcon } from "src/components/icon/AppleIcon";
import { GoogleIcon } from "src/components/icon/GoogleIcon";
import { Button } from "src/components/shared/Button";

const SignUp: NextPage = () => {
  return (
    <div>
      <div className="bg-gray-200 w-screen h-screen">
        <Button button bgColor="transparent" className="absolute left-2">
          <ChevronLeftIcon className="w-5 h-5" />
        </Button>
        <div className="h-screen flex flex-col justify-center">
          <div className="flex justify-center mb-16">Memo</div>
          <Button button bgColor="white" startIcon={<GoogleIcon />} size="large" className="w-80">
            Googleでアカウントを作成
          </Button>
          <Button button bgColor="black" startIcon={<AppleIcon iconColor="white" />} size="large" className="w-80">
            Appleでアカウントを作成
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
