import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import EditData from "./EditData";
import { Metadata } from "next";

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

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const userInfo = await prisma.user.findUnique({
    where: {
      email: session?.user?.email!,
    },
  });
  return (
    <div>
      <EditData user={userInfo!} />
    </div>
  );
}
