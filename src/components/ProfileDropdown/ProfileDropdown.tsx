"use client";

import { FC, useState, useRef } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import useOutsideAlerter from "@/lib/outside-click";

interface Props {
  avatarUrl: string | null;
}

const ProfileDropdown: FC<Props> = ({ avatarUrl }) => {
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
          className="h-10 w-10 rounded-full object-cover shadow-sm"
        />
      </button>

      {isOpen ? (
        <div
          className="absolute right-0 z-10 mt-3 w-56 origin-top-right rounded-md bg-white shadow-sm ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          ref={wrapperRef}
        >
          <div className="py-1" role="none">
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-0"
            >
              Account settings
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-1"
            >
              Support
            </a>
            <a
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              id="menu-item-2"
            >
              License
            </a>
            <button
              className="text-gray-700 block w-full px-4 py-2 text-left text-sm"
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
