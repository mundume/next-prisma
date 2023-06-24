import { getServerSession } from "next-auth";
import React from "react";
import AvatarSheet from "./sidebar/AvatarSheet";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

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
    <div className="navbar bg-base-100 md:px-14">
      <div className="flex-1">
        <a href={href} className="text-xl normal-case btn btn-ghost">
          Twinder
        </a>
      </div>
      <div className="flex-none px-5">
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
  );
}

export default Navbar;
