"use client";

import { FC, useState } from "react";
import Avatar from "../Avatar";

interface Props {
  avatarUrl: string;
  canEdit?: boolean;
  userId: string;
}

const ProfileInfo: FC<Props> = ({ avatarUrl, canEdit = false, userId }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="relative">
        <Avatar imageUrl={avatarUrl} size="lg" />
        {canEdit ? (
          <button className="absolute left-12 bg-blue-600 rounded-md shadow-sm p-1.5 -bottom-1 hover:bg-blue-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="w-4 h-4 text-white"
            >
              <path d="M2.695 14.763l-1.262 3.154a.5.5 0 00.65.65l3.155-1.262a4 4 0 001.343-.885L17.5 5.5a2.121 2.121 0 00-3-3L3.58 13.42a4 4 0 00-.885 1.343z" />
            </svg>
          </button>
        ) : null}
      </div>
      {isOpen ? (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-60"
          onClick={() => setIsOpen(false)}
        ></div>
      ) : null}
    </>
  );
};

export default ProfileInfo;
