import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import EditData from "../EditData";
import { authOptions } from "@/utils/auth";

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
    redirect("/signin");
  }
  const userInfo = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
    select: {
      name: true,
      id: true,
      email: true,
      age: true,
      bio: true,
      image: true,
    },
  });

  if (userInfo) {
    return (
      <div>
        {/* @ts-ignore server component */}
        <EditData user={userInfo} />
      </div>
    );
  }
}
