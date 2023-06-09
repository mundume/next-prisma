import { User } from "@prisma/client";
import React from "react";
import FollowButton from "./FollowButton/FollowButton";
import Image from "next/image";
import Avatar from "./Avatar";

export default async function UserCard({ userData }: { userData: User }) {
  return (
    <>
      <img
        src={userData?.image!}
        alt={userData?.name!}
        className="object-cover w-full h-48"
      />
      <Avatar image={userData?.image!} name={userData?.name!} />

      <p className="font-semibold text-purple-600">{userData?.name}</p>
      <small className="font-bold">{userData?.age}</small>

      <p className="py-2 text-gray-500">{userData?.bio}</p>
      {/* //@ts-ignore */}
    </>
  );
}
