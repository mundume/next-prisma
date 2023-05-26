import FollowButton from "@/app/components/FollowButton/FollowButton";
import UserCard from "@/app/components/UserCard";

import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import Link from "next/link";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `User profile of ${user?.name}` };
}

export default async function page({ params }: Props) {
  const userData = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <div className="grid gap-1 p-2">
      {/* @ts-ignore */}
      <UserCard userData={userData} />
      {/* @ts-ignore */}
      <FollowButton targetUserId={params.id} />
      <Link href={`/`} className="w-auto font-bold text-yellow-400">
        return home
      </Link>
    </div>
  );
}
