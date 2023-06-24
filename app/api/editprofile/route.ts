///deprecated using server actions for now.

import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions);
  const currentEmail = session?.user?.email!;
  //data from request from the client
  const data = await req.json();
  data.age = Number(data.age);
  const user = await prisma.user.update({
    where: {
      email: currentEmail,
    },
    data: {
      name: data.get
    }
  });

  return NextResponse.json(user);
}
