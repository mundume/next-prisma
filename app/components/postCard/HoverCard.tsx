import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hovercard";
import Link from "next/link";
import Avatar from "../Avatar";
import FollowButton from "../FollowButton/FollowButton";

type Props = {
  id?: string;
  href?: string;
  name?: string;
  image?: string;
  following?: number;
  followers?: number;
  bio?: string;
};
export default function ProfileHoverCard({
  href,
  name,
  image,
  followers,
  following,
  bio,
  id,
}: Props) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Link href={href!} prefetch={true} className="font-semibold ">
          {name}
        </Link>
      </HoverCardTrigger>
      <HoverCardContent>
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1 font-semibold">
            <Avatar image={image!} name={name!} />
            {name}
          </div>
          {/* @ts-ignore */}
          <FollowButton targetUserId={id} />
        </div>
        <div className="flex gap-2 py-4 text-purple-500">
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <p className="text-lg">{followers} </p>
              <p className="text-sm text-gray-500">Followers</p>
            </div>
          </div>
          <div className="flex items-center justify-between gap-1">
            <div className="flex items-center gap-1">
              <p className="text-lg">{following} </p>
              <p className="text-sm text-gray-500">Following</p>
            </div>
          </div>
        </div>
        <p className="py-3 text-sm text-gray-500">{bio}</p>
      </HoverCardContent>
    </HoverCard>
  );
}
