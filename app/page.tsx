import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import Link from "next/link";
import { prisma } from "@/lib/prisma";

import AlertDiailog from "./components/AlertDiailog";

import clsx from "clsx";

type Data = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

export default async function Home() {
  const session = await getServerSession(authOptions);
  const profileData = await prisma.user?.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });

  return (
    <div>
      {session ? (
        <div className="flex justify-around">
          <Link href={`/profile/${profileData?.id}`}>Profile</Link>
          <p>{profileData?.name}</p>
          <Link href="/users">Users</Link>
        </div>
      ) : (
        <div className={clsx("flex justify-between ")}>
          <Link href="/api/auth/signin">Sign in</Link>
        </div>
      )}
    </div>
  );
}
