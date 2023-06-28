"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function updateUserData(data: FormData) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email!;

  await prisma.user.update({
    where: {
      email: currentEmail,
    },
    data: {
      name: data.get("name") as string,
      bio: data.get("bio") as string,
      age: Number(data.get("age")),
      image: data.get("image") as string,
    },
  });
}
