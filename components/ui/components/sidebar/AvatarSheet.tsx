"use client";
import { RxAvatar } from "react-icons/rx";
import Avatar from "../Avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "./sheetComponent";
import { LuEdit } from "react-icons/lu";
import SideBarLinks from "./SideBarLinks";
import { Sign } from "crypto";
import LogoutButton from "./LogoutButton";

type Props = {
  name: string;
  image: string;
  followers?: number;
  following?: number;
  email: string;
  bio?: string;
  id: string;
};

export default function AvatarSheet({
  followers,
  following,
  name,
  image,
  email,
  id,
}: Props) {
  return (
    <Sheet>
      <SheetTrigger>
        <Avatar image={image} name={name} />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="font-semibold text-gray-600">
            Account Info
          </SheetTitle>
          <SheetDescription className="py-2">
            <div className="flex items-center justify-start gap-1">
              <Avatar image={image} name={name} />
              <p className="font-semibold">{name}</p>
            </div>
            <p className="flex font-semibold text-yellow-500 ">{email}</p>

            <div className="flex items-center gap-2 py-4 font-medium text-purple-600">
              <div className="flex items-center gap-1">
                <p className="text-lg">{followers} </p>
                <p className="text-sm text-gray-500">followers</p>
              </div>
              <p className="flex items-center gap-1">
                <p className="text-lg">{following} </p>
                <p className="text-sm text-gray-500">following</p>
              </p>
            </div>
            <div className="py-5">
              <SheetClose asChild>
                <SideBarLinks
                  href={`/profile/${id}`}
                  text="Profile"
                  icon={<RxAvatar className="text-2xl text-purple-500" />}
                />
              </SheetClose>

              <SideBarLinks
                href={`/editprofile/${id}`}
                text="Edit Profile"
                icon={<LuEdit className="text-2xl text-purple-500" />}
              />
              <div className="px-4 py-4">
                <LogoutButton />
              </div>
            </div>
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
