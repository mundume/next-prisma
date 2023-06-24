import { getServerSession } from "next-auth";
import SideBarLinks from "./SideBarLinks";
import { BiHomeCircle } from "react-icons/bi";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { RxAvatar } from "react-icons/rx";
import { LuEdit } from "react-icons/lu";

export default async function SideBar() {
  const session = await getServerSession(authOptions);
  const userId = await prisma.user
    ?.findFirst({
      where: {
        email: session?.user?.email!,
      },
    })
    .then((user) => user?.id);
  return (
    <div className="fixed px-16 ">
      <SideBarLinks
        href="/"
        text="Home"
        icon={<BiHomeCircle className="text-2xl text-purple-500" />}
      />
      <SideBarLinks
        href={`/profile/${userId}`}
        text="Profile"
        icon={<RxAvatar className="text-2xl text-purple-500" />}
      />
      <SideBarLinks
        href={`/editprofile/${userId}`}
        text="Edit Profile"
        icon={<LuEdit className="text-2xl text-purple-500" />}
      />
    </div>
  );
}
