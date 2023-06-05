import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

import clsx from "clsx";
import AddPosts from "./post/addpost";
import { Posts } from "./posts";
import Navbar from "./components/Navbar";
import Avatar from "./components/Avatar";

type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user?.findFirst({
    where: {
      email: session?.user?.email!,
    },
  });

  return (
    <div className="p-2">
      {session ? (
        <div className="">
          <Navbar href={`/`} />
          <div className="flex items-center gap-1">
            <Avatar image={user?.image!} />
            <AddPosts />
          </div>
          {/* @ts-ignore */}
          <Posts />
        </div>
      ) : (
        <div className={clsx("flex justify-between ")}>
          <Link href="/api/auth/signin">Sign in</Link>
        </div>
      )}
    </div>
  );
}
