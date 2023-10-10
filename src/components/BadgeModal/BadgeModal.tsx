"use client";

import { FC } from "react";

interface Props {
  badgeId: string;
}

const BadgeModal: FC<Props> = ({ badgeId }) => {
  return (
    <div className="fixed w-screen h-screen bg-gray-900 opacity-60 left-0 top-0 flex items-center justify-center z-[100]">
      <div className="flex flex-col gap-4 p-8 rounded-md shadow-sm bg-white">
        <h2 className="text-xl font-semibold text-gray-900">
          You earned a badge!
        </h2>
        {badgeId}
      </div>
    </div>
  );
};

export default BadgeModal;
