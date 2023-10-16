"use client";

import { FC, useState } from "react";
import Image from "next/image";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";
import Avatar from "../Avatar";

interface Props {
  avatarUrl: string;
  canEdit?: boolean;
  userId: string;
}

const ProfileInfo: FC<Props> = ({ avatarUrl, canEdit = false, userId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [avatarPath, setAvatarPath] = useState<string>();

  const router = useRouter();
  const supabase = createClientComponentClient();
  const notify = () => toast.success("Profile updated succesfully");

  const uploadFile = async (file: File) => {
    if (file) {
      const { data, error } = await supabase.storage
        .from("avatars")
        .upload(`${nanoid()}.${file.name.split(".").at(-1)}`, file, {
          cacheControl: "3600",
          upsert: false,
        });

      if (error) {
        console.log(error);
        return;
      }

      setAvatarPath(data.path);
    }
  };

  const handleUpdateProfile = async () => {
    const { error } = await supabase
      .from("profiles")
      .update({
        avatar_url: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarPath}`,
      })
      .eq("id", userId);

    if (error) {
      console.log(error);
    }

    notify();
    setIsOpen(false);
    router.refresh();
  };

  return (
    <>
      <div className="relative">
        <Avatar imageUrl={avatarUrl} size="lg" />
        {canEdit ? (
          <button
            className="absolute left-12 bg-blue-600 rounded-md shadow-sm p-1.5 -bottom-1 hover:bg-blue-500"
            onClick={() => setIsOpen(true)}
          >
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
          className="fixed top-0 left-0 w-screen h-screen bg-gray-900 bg-opacity-60 z-[100] flex justify-center items-center"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="flex flex-col p-6 rounded-md shadow-sm gap-4 bg-white"
            onClick={(e) => e.stopPropagation()}
          >
            <h4 className="text-xl font-semibold text-gray-900">Edit Avatar</h4>
            <label htmlFor="avatar" className="block font-medium text-gray-700">
              Avatar Image
            </label>
            <div className="flex items-center space-x-6 mb-4">
              <div className="shrink-0">
                <Image
                  id="preview_img"
                  className="h-16 w-16 object-cover rounded-full"
                  height={32}
                  width={32}
                  src={
                    avatarPath
                      ? `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/avatars/${avatarPath}`
                      : avatarUrl
                      ? avatarUrl
                      : "/default.png"
                  }
                  alt="Current profile photo"
                  priority
                />
              </div>
              <label className="block">
                <span className="sr-only">Choose profile photo</span>
                <input
                  type="file"
                  name="avatar"
                  accept=".png,.jpg,.gif"
                  onChange={async (e) => {
                    if (e.target.files) {
                      await uploadFile(e.target.files[0]);
                    }
                  }}
                  className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                />
              </label>
            </div>
            <button
              className="bg-blue-600 self-end text-white py-2 px-4 font-medium shadow-sm rounded-md w-fit flex justify-center items-center gap-2 hover:bg-blue-500 focus:bg-blue-600 focus:ring-1 ring-blue-500 ring-offset-2 disabled:cursor-not-allowed disabled:bg-blue-300"
              onClick={handleUpdateProfile}
              disabled={!avatarPath}
            >
              Update Avatar
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ProfileInfo;
