import Avatar from "./Avatar";
import FollowButton from "./FollowButton/FollowButton";

type Props = {
  targetUserId: string;
  name: string;
  image: string;
  followers: number;
  following: number;
  bio: string;
};

export default function WhoToFolllowComponent({
  targetUserId,
  image,
  name,
  followers,
  following,
  bio,
}: Props) {
  return (
    <div className="px-2 py-4 border rounded-md">
      <div className="flex items-center justify-between ">
        <div className="flex flex-col gap-1 font-semibold">
          <Avatar image={image!} name={name!} />
          {name}
        </div>
        {/* @ts-ignore */}
        <FollowButton targetUserId={targetUserId} />
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
    </div>
  );
}
