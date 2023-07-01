import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserCard from "../../components/ui/components/UserCard";
import Link from "next/link";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/api/auth/signin");
  }
  const users = await prisma.user.findMany();
  return (
    <div>
      {users.map((user) => (
        <>
          {/* @ts-ignore */}
          <UserCard key={user.id} userData={user} />
          <Link href={`/profile/${user.id}`}>View Profile</Link>
        </>
      ))}
    </div>
  );
}
