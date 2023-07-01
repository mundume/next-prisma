import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

import clsx from "clsx";
import AddPosts from "./post/addpost";
import { Posts } from "./posts";
import Avatar from "../components/ui/components/Avatar";
import Navbar from "../components/ui/components/Navbar";

export const revalidate = 60;

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user?.findFirst({
    where: {
      email: session?.user?.email!,
    },
  });

  return (
    <div className={clsx("border")}>
      {session && (
        // @ts-ignore server component cant ne rendered as jsx
        <Navbar href="/" />
      )}
      <div className="p-2">
        {session ? (
          <>
            {/* @ts-ignore */}

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1">
                <Avatar image={user?.image!} name={user?.name!} />

                <AddPosts />
              </div>
              <div className="flex items-center ">
                {/* @ts-ignore */}
                <Posts />
              </div>
            </div>
          </>
        ) : (
          <div className={clsx("flex justify-between ")}>
            <Link href="/api/auth/signin">Sign in</Link>
          </div>
        )}
      </div>
    </div>
  );
}
