"use client";

import { FC } from "react";
import Avatar from "../Avatar";
import { Rating, ThinStar } from "@smastrom/react-rating";
import Markdown from "react-markdown";

interface Props {
  user: any;
  activity?: any;
  rating?: any;
}

const ActivityCard: FC<Props> = ({ activity, user, rating }) => {
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
        <Avatar imageUrl={user.avatar_url} />
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
            ? "w-full h-12 flex items-baseline gap-2 bg-gray-200 rounded-t-md p-4 pt-3"
            : "w-full h-12 flex items-baseline gap-2 bg-blue-600 rounded-t-md p-4 pt-3"
        }
      >
        <h6
          className={
            rating ? "font-semibold text-gray-900" : "font-semibold text-white"
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
