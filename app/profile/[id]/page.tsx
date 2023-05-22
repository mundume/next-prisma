import { prisma } from "@/lib/prisma";

type Props = {
  params: {
    id: string;
  };
};

export default async function page({ params }: Props) {
  const userData = await prisma.user.findUnique({
    where: {
      id: params.id,
    },
  });

  return (
    <div className="grid gap-1 p-2">
      <img src={userData?.image!} alt={userData?.name!} />
      <small className="font-bold">{userData?.email!}</small>
      <p className="font-semibold text-purple-600">{userData?.name}</p>
    </div>
  );
}
