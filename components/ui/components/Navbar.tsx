import { getServerSession } from "next-auth";
import React from "react";
import AvatarSheet from "./sidebar/AvatarSheet";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { BiCameraHome } from "react-icons/bi";

async function Navbar({ href }: { href: string }) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  const currentUser = await prisma.user.findUnique({
    where: {
      email: currentEmail!,
    },
    include: {
      followedBy: true,
      following: true,
    },
  });
  return (
    session && (
      <div className="px-2 navbar bg-base-100 md:px-4">
        <div className="flex-1">
          <Link href={href} className="text-xl normal-case">
            <BiCameraHome className="text-3xl text-purple-500" />
          </Link>
        </div>
        <div className="flex-none md:hidden md:px-5">
          <AvatarSheet
            name={currentUser?.name!}
            image={currentUser?.image!}
            followers={currentUser?.followedBy.length}
            following={currentUser?.following.length!}
            email={currentUser?.email!}
            bio={currentUser?.bio!}
            id={currentUser?.id!}
          />
        </div>
      </div>
    )
  );
}

export default Navbar;
