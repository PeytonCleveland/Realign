"use client";

import { FC } from "react";
import { Rating, ThinStar } from "@smastrom/react-rating";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Submission {
  id: string;
  user: { name: string; avatar: string };
  prompt: string;
  response: string;
  rating: number;
  tags: string[];
}

interface Props {
  submissions: Submission[];
}

const SubmissionTable: FC<Props> = ({ submissions }) => {
  const router = useRouter();

  return (
    <div className="flex flex-col w-full shadow-sm border-2 border-blue-600 rounded-md">
      <div className="w-full flex bg-blue-600 p-4 text-white font-medium justify-evenly gap-5">
        <div className="w-[75px]">
          <p>User</p>
        </div>
        <div className="flex flex-1">Prompt</div>
        <div className="flex flex-1">Response</div>
        <div className="w-[150px]">Rating</div>
        <div className="w-[15%]">Tags</div>
      </div>
      {submissions.length === 0 ? (
        <div className="flex w-full justify-center items-center pt-12 pb-20 flex-col gap-3 bg-gray-100">
          <Image
            src="/shred.gif"
            width={150}
            height={150}
            alt="letter"
            className="mr-3 mb-1"
          />
          <h6 className="text-xl font-semibold text-gray-800">
            You haven&apos;t submitted any data
          </h6>
          <Link href="/app/submissions/new">
            <button className="bg-blue-600 text-white disabled:bg-blue-300 px-5 py-2 font-medium rounded-md flex items-center gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2 mt-2">
              Create submission
            </button>
          </Link>
        </div>
      ) : (
        submissions.map((submission, index) => {
          return (
            <div
              key={submission.id}
              onClick={() => router.push(`/app/submissions/${submission.id}`)}
              className={
                index === 0
                  ? "w-full flex p-4 gap-5 justify-evenly hover:cursor-pointer hover:bg-blue-50"
                  : "w-full flex p-4 gap-5 justify-evenly border-t-2 border-gray-200 hover:cursor-pointer hover:bg-blue-50"
              }
            >
              <div className="w-[75px] flex items-center">
                <div className="w-fit h-fit rounded-full overflow-hidden">
                  <Image
                    width={45}
                    height={45}
                    alt="avatar"
                    src={submission.user.avatar}
                  />
                </div>
              </div>
              <div className="flex flex-1">
                <p className="text-sm">{`${submission.prompt
                  .substring(0, 180)
                  .trim()}${submission.prompt.length > 150 ? "..." : ""}`}</p>
              </div>
              <div className="flex flex-1">
                <p className="text-sm">{`${submission.response
                  .substring(0, 150)
                  .trim()}${submission.response.length > 150 ? "..." : ""}`}</p>
              </div>
              <div className="w-[150px] flex flex-col gap-2">
                <Rating
                  value={submission.rating}
                  style={{ maxWidth: "110px" }}
                  itemStyles={{
                    itemShapes: ThinStar,
                    activeBoxColor: [
                      "#f7b609",
                      "#f7b609",
                      "#f7b609",
                      "#f7b609",
                      "#f7b609",
                    ],
                    inactiveBoxColor: "#C7C7C7",
                    inactiveFillColor: "white",
                    activeFillColor: "white",
                  }}
                  readOnly
                  spaceBetween="small"
                  halfFillMode="box"
                />
                <p className="font-semibold text-sm text-gray-900">
                  {submission.rating === 0
                    ? "Not yet rated"
                    : `${submission.rating} / 5`}
                </p>
              </div>
              <div className="w-[15%] flex flex-wrap gap-1">
                {submission.tags.map((tag, index) => {
                  return (
                    <div
                      key={index}
                      className="py-1.5 px-3 text-xs bg-blue-600 text-white w-fit h-fit rounded-full"
                    >
                      {tag}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default SubmissionTable;
