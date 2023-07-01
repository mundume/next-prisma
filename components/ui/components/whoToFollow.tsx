import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../../app/api/auth/[...nextauth]/route";
import SideRecommended from "./SideRecommended";

export default async function WhoToFollow() {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email;
  const userId = await prisma.user
    .findUnique({
      where: {
        email: currentEmail!,
      },
    })
    .then((user) => user?.id!);
  //filter non following accounts
  const usersNotFollowing = await prisma.user.findMany({
    where: {
      NOT: {
        followedBy: {
          some: {
            followerId: userId,
          },
        },
      },
    },
    include: {
      followedBy: true,
      following: true,
    },
  });

  return (
    <div className="">
      <h1 className="block py-4 m-auto font-semibold text-center text-gray-700 lg:text-2xl ">
        Who to follow
      </h1>

      {usersNotFollowing.map((user) => {
        if (user.id !== userId) {
          return (
            // @ts-ignore server component

            <SideRecommended
              name={user.name!}
              image={user.image!}
              targetUserId={user.id}
              key={user.id}
              followers={user.followedBy.length}
              following={user.following.length}
              bio={user.bio!}
            />
          );
        }
      })}
    </div>
  );
}
