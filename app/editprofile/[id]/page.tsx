import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import EditData from "../EditData";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata(): Promise<Metadata> {
  const session = await getServerSession(authOptions);
  const user = await prisma.user.findUnique({
    where: { email: session?.user?.email! },
  });
  return { title: `User profile of ${user?.name}` };
}

export default async function page({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const userInfo = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return (
    <div>
      <EditData user={userInfo!} />
    </div>
  );
}
