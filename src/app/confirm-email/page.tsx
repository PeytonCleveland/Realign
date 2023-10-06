import Link from "next/link";
import Image from "next/image";
import { Page } from "@/components";

const ConfirmEmail = () => {
  return (
    <Page>
      <div className="flex flex-col gap-20 w-screen h-screen justify-center items-center bg-gray-100">
        <Link href="/" className="-mt-12">
          <Image
            src="/realign-logo.png"
            width={200}
            height={70}
            alt="Realign Logo"
          />
        </Link>
        <div className="p-6 flex flex-col gap-4 bg-white rounded-md shadow-sm max-w-[500px] -mt-12">
          <h1 className="text-xl font-semibold text-gray-900">Verify Email</h1>
          <p className="text-sm font-light text-gray-600">
            We sent an email to your Omni Federal email address. Please check
            your inbox to verify your account.
          </p>
          <p className="text-blue-600">You may now close this tab.</p>
        </div>
      </div>
    </Page>
  );
};

export default ConfirmEmail;
