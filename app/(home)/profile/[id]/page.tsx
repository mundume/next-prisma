import FollowButton from "@/components/ui/components/FollowButton/FollowButton";
import UserCard from "@/components/ui/components/UserCard";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/auth";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({ where: { id: params.id } });
  return { title: `${user?.name} profile` };
}

export default async function page({ params }: Props) {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/");
  }
  const currentEmail = session?.user?.email;

  const userData = await prisma.user.findUnique({
    where: {
      id: params.id,
    },

    include: {
      followedBy: true,
      following: true,
      posts: {
        orderBy: {
          createdAt: "desc",
        },
        include: {
          Comment: {
            orderBy: {
              createdAt: "desc",
            },
          },
        },
      },
    },
  });

  return (
    <div className="grid gap-1">
      {/* @ts-ignore */}
      <UserCard userData={userData} />
      <div className="p-2">
        <section className="flex items-center justify-between gap-2 py-4 font-medium text-purple-600">
          <div className="flex items-center gap-1 px-2">
            <div className="flex items-center gap-1">
              <p className="text-lg">{userData?.following.length} </p>
              <p className="text-sm text-gray-500">Following</p>
            </div>

            <div className="flex items-center justify-between gap-1">
              <div className="flex items-center gap-1">
                <p className="text-lg">{userData?.followedBy.length} </p>
                <p className="text-sm text-gray-500">Followers</p>
              </div>
            </div>
          </div>
          {userData?.email === currentEmail ? (
            <Link
              href={`/editprofile/${params.id}`}
              className="inline-flex justify-center px-4 py-2.5 text-sm font-semibold text-purple-400 bg-white border  rounded-md hover:bg-purple-400 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-200 focus-visible:ring-offset-2 border-purple-400 mr-4"
            >
              Edit Profile
            </Link>
          ) : (
            // @ts-ignore
            <FollowButton targetUserId={params.id} />
          )}
        </section>
      </div>
    </div>
  );
}
