import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UserCard from "../../components/ui/components/UserCard";
import Link from "next/link";
import { authOptions } from "@/utils/auth";

export default async function page() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/signin");
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
