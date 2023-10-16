"use client";

import { FC, useState, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import useOutsideAlerter from "@/lib/outside-click";
import Link from "next/link";

interface Props {
  avatarUrl: string | null;
  userId: string;
}

const ProfileDropdown: FC<Props> = ({ avatarUrl, userId }) => {
  const [isOpen, setIsOpen] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, () => setIsOpen(false));

  const router = useRouter();

  const supabase = createClientComponentClient();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/sign-in");
  };

  return (
    <div className="relative inline-block text-left">
      <button className="block shrink-0" onClick={(e) => setIsOpen(true)}>
        <span className="sr-only">Profile</span>
        <img
          alt="Man"
          src={avatarUrl ?? "/default.png"}
          className="h-10 w-10 rounded-full object-cover shadow-sm transform transition duration-200 hover:scale-105 hover:shadow-xl"
        />
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 z-10 mt-3 w-40 origin-top-right rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          ref={wrapperRef}
        >
          <div role="none">
            <Link
              href={`/app/profile/${userId}`}
              onClick={() => setIsOpen(false)}
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-50"
              role="menuitem"
              id="menu-item-0"
            >
              Profile
            </Link>
            {/* <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm hover:bg-blue-50"
              role="menuitem"
              id="menu-item-1"
            >
              Support
            </a> */}
            <button
              className="text-gray-700 px-4 py-2 text-sm hover:bg-blue-50 flex w-full"
              role="menuitem"
              id="menu-item-3"
              onClick={() => handleSignOut()}
            >
              Sign out
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ProfileDropdown;
