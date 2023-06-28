import MyDialog from "@/app/components/Dialog";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";

type Props = {
  params: {
    id: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const user = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });
  return {
    title: `User profile of ${user?.name}`,
  };
}

export default async function page({ params }: Props) {
  const userData = await prisma.user?.findUnique({
    where: {
      id: params.id,
    },
    include: {
      followedBy: true,
      following: true,
    },
  });

  return (
    <div>
      <MyDialog
        image={userData?.image!}
        bio={userData?.bio!}
        name={userData?.name!}
        age={userData?.age!}
        email={userData?.email!}
        id={userData?.id!}
        followers={userData?.followedBy.length!}
        following={userData?.following.length!}
      />
    </div>
  );
}
