"use client";

import { FC } from "react";
import Avatar from "../Avatar";
import { Rating, ThinStar } from "@smastrom/react-rating";
import Markdown from "react-markdown";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
  user: any;
  activity?: any;
  rating?: any;
  canEdit?: boolean;
}

const ActivityCard: FC<Props> = ({
  activity,
  user,
  rating,
  canEdit = false,
}) => {
  const pathname = usePathname();
  const ratingSwitch = (rating: number) => {
    switch (rating) {
      case 5:
        return "Excellent";
      case 4:
        return "Above Average";
      case 3:
        return "Average";
      case 2:
        return "Below Average";
      case 1:
        return "Poor";
      default:
        return "";
    }
  };

  const choiceSwitch = (choice: string) => {
    switch (choice) {
      case "yes":
        return "✅";
      case "no":
        return "❌";
      case "unsure":
        return "🤷‍♂️";
    }
  };

  return (
    <div
      className={
        rating
          ? "flex flex-col h-fit rounded-lg relative border-2 border-gray-200 shadow-sm"
          : "flex flex-col h-fit rounded-lg relative border-2 border-blue-600 shadow-sm"
      }
    >
      <div className="absolute top-0.5 -left-16">
        <Avatar imageUrl={user.avatar_url ?? "/default.png"} />
      </div>
      <span
        className={
          rating
            ? "w-4 h-4 bg-gray-200 transform rotate-45 absolute top-4 -left-1.5 -z-10"
            : "w-4 h-4 bg-blue-600 transform rotate-45 absolute top-4 -left-1.5 -z-10"
        }
      />
      <div
        className={
          rating
            ? "w-full h-12 flex items-baseline justify-between bg-gray-200 rounded-t-md p-4 pt-3"
            : "w-full h-12 flex items-baseline justify-between bg-blue-600 rounded-t-md p-4 pt-3"
        }
      >
        <div className="flex gap-2 items-baseline">
          <h6
            className={
              rating
                ? "font-semibold text-gray-900"
                : "font-semibold text-white"
            }
          >
            {user.full_name}
          </h6>
          <p
            className={
              rating
                ? "text-gray-700 font-light text-sm"
                : "text-gray-200 font-light text-sm"
            }
          >
            {rating
              ? `Rated on ${new Date(rating.created_at).toDateString()}`
              : `Submitted on ${new Date(activity.created_at).toDateString()}`}
          </p>
        </div>
        {canEdit ? (
          <Link
            href={`${pathname}/edit`}
            className="text-white flex gap-2 items-center"
          >
            Edit
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-5 h-5"
            >
              <path d="M5.433 13.917l1.262-3.155A4 4 0 017.58 9.42l6.92-6.918a2.121 2.121 0 013 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 01-.65-.65z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0010 3H4.75A2.75 2.75 0 002 5.75v9.5A2.75 2.75 0 004.75 18h9.5A2.75 2.75 0 0017 15.25V10a.75.75 0 00-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5z" />
            </svg>
          </Link>
        ) : null}
      </div>
      <div className="flex flex-col gap-2 p-4">
        {rating ? (
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <p className="text-gray-900 font-semibold">Overall Rating</p>
              <div className="flex gap-2 items-center">
                <Rating
                  value={rating.overall_rating}
                  readOnly
                  style={{ maxWidth: "160px" }}
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
                  spaceBetween="small"
                  halfFillMode="box"
                />
                <p className="text-gray-600 font-light text-sm pt-0.5">
                  {ratingSwitch(rating.overall_rating)}
                </p>
              </div>
            </div>
            <div className="flex gap-6 w-full">
              <p className="text-gray-900 font-semibold">
                {choiceSwitch(rating.truthful)}&nbsp;&nbsp;Truthful
              </p>
              <p className="text-gray-900 font-semibold">
                {choiceSwitch(rating.helpful)}&nbsp;&nbsp;Helpful
              </p>
              <p className="text-gray-900 font-semibold">
                {choiceSwitch(rating.safe)}&nbsp;&nbsp;Safe
              </p>
            </div>
          </div>
        ) : (
          <>
            <h3 className="font-medium text-gray-900 sm:text-lg">Prompt</h3>
            {activity.prompt.split("\n").map((line: string, index: number) => {
              return (
                <p className="text-sm font-light" key={index}>
                  {line}
                </p>
              );
            })}

            <h3 className="font-medium text-gray-900 sm:text-lg">Response</h3>
            <Markdown
              components={{
                code({ children }) {
                  return children!.toString().split(" ").length > 1 ? (
                    <pre className="bg-gray-900 rounded-md text-white text-sm p-6 shadow-sm font-mono">
                      {children}
                    </pre>
                  ) : (
                    <code className="bg-gray-900 rounded-md px-2 py-1 text-white text-sm">
                      {children}
                    </code>
                  );
                },
                p({ children }) {
                  return <p className="text-gray-900 font-light">{children}</p>;
                },
              }}
            >
              {activity.response}
            </Markdown>
          </>
        )}
      </div>
    </div>
  );
};

export default ActivityCard;
