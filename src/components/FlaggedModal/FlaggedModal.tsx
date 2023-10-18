"use client";

import { FC } from "react";
import Link from "next/link";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

interface Props {
  userId: string;
}

const FlaggedModal: FC<Props> = ({ userId }) => {
  const supabase = createClientComponentClient();
  const router = useRouter();

  const handleClearModal = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({ flagged: false })
      .eq("id", userId);

    if (error) console.log(error);

    router.refresh();
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-60 flex justify-center items-center z-[100]">
      <div className="flex flex-col rounded-md shadow-sm bg-white p-6 gap-6 w-[500px]">
        <h3 className="text-lg font-semibold text-gray-900">Account Flagged</h3>
        <div className="flex flex-col gap-3 w-full">
          <p className="text-sm font-light text-gray-600">
            Your account has been flagged for bot/spam activity based on the
            content and timestamps of the following{" "}
            <strong className="text-gray-900 font-semibold">260</strong>{" "}
            submissions. These submissions and the points awarded for them have
            been removed.
          </p>
          <Link
            href="/flagged-submissions.csv"
            download
            className="text-sm font-light text-blue-600 flex items-center gap-1.5 hover:underline underline-offset-4 decoration-blue-600"
          >
            Flagged submissions
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
              <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
            </svg>
          </Link>
        </div>
        <button
          onClick={handleClearModal}
          className="bg-blue-600 text-white disabled:bg-blue-300 px-5 py-2 font-medium rounded-md flex items-center gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2 self-end"
        >
          Continue
        </button>
      </div>
    </div>
  );
};

export default FlaggedModal;
