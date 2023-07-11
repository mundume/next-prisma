///deprecated using server actions for now.

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/utils/auth";
import { revalidatePath, revalidateTag } from "next/cache";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.redirect("/signin");
  }

  const currentEmail = session?.user?.email;

  if (currentEmail) {
    const data = await req.json();
    data.age = Number(data.age);
    const user = await prisma.user.update({
      where: {
        email: currentEmail,
      },
      data,
    });

    const { searchParams } = new URL(req.url);
    const id = searchParams.get(user.id);
    id && revalidateTag(id);
    revalidatePath(`/profile/${user.id}`);
    return NextResponse.json(user);
    //data from request from the client
  }
}
