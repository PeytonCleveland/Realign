"use client";

import { FC, useState } from "react";
import Tabs from "../Tabs";
import Image from "next/image";

interface Props {
  user: any;
}

const Achievements: FC<Props> = ({ user }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="pt-3 pb-0 w-full rounded-t-md flex shadow-sm bg-blue-50">
        <Tabs
          onChange={(i) => {
            setActiveTab(i);
          }}
          borderColor="blue"
          tabs={["My Stats", "Achievements"]}
        />
      </div>
      {activeTab === 0 ? (
        <>
          <div className="p-6 flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <p className="font-light text-sm text-gray-600">Daily Streak</p>
              <h6 className="font-semibold text-xl">
                <span className="text-xl mr-2">🔥</span>
                {user.points} Day Streak
              </h6>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-light text-sm text-gray-600">Total Points</p>
              <h6 className="font-semibold text-xl">
                <span className="text-xl mr-2">🏆</span>
                {user.points} points
              </h6>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-light text-sm text-gray-600">
                Total Submissions
              </p>
              <h6 className="font-semibold text-xl">
                <span className="text-xl mr-2">📝</span>
                {user.points} Submissions
              </h6>
            </div>
            <div className="flex flex-col gap-1">
              <p className="font-light text-sm text-gray-600">Total Ratings</p>
              <h6 className="font-semibold text-xl">
                <span className="text-xl mr-2">🎯</span>
                {user.points} Ratings
              </h6>
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col gap-2 p-6 w-fit justify-center items-center">
          <Image
            src={"/1-day-streak.svg"}
            width={80}
            height={80}
            alt="One Day Streak"
          />
          <p className="text-sm font-semibold text-gray-900">1 Day Streak</p>
        </div>
      )}
    </>
  );
};

export default Achievements;
