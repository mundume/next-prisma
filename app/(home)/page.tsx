import { getServerSession } from "next-auth";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

import clsx from "clsx";
import AddPosts from "../(postdirectory)/post/addpost";
import { Posts } from "@/components/ui/components/posts/Posts";
import Avatar from "@/components/ui/components/Avatar";
import Navbar from "@/components/ui/components/Navbar";
import { redirect } from "next/navigation";
import { authOptions } from "@/utils/auth";

export const revalidate = 60;

export default async function Home() {
  const session = await getServerSession(authOptions);
  const user = await prisma.user?.findFirst({
    where: {
      email: session?.user?.email!,
    },
  });

  return (
    <>
      {session ? (
        <div className={clsx("border")}>
          {/*  @ts-ignore server component cant ne rendered as jsx */}
          <Navbar href="/" />

          <div className="p-2">
            <div className="flex flex-col items-center ">
              <div className="flex items-center gap-1">
                <Avatar image={user?.image!} name={user?.name!} />

                <AddPosts />
              </div>
              <div className="flex items-center ">
                {/* @ts-ignore server component */}
                <Posts />
              </div>
            </div>
          </div>
        </div>
      ) : (
        redirect("/signin")
      )}
    </>
  );
}
