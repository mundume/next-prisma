"use client";

import { signOut } from "next-auth/react";
import { HiLogout } from "react-icons/hi";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut()}
      className="flex gap-1 items-center justify-center px-4 py-2.5 text-sm font-semibold text-purple-400 bg-white border  rounded-md hover:bg-purple-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 border-purple-400 mr-4"
    >
      <HiLogout /> SignOut
    </button>
  );
}
