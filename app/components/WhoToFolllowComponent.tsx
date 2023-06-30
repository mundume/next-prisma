import Avatar from "./Avatar";
import FollowButton from "./FollowButton/FollowButton";

type Props = {
  targetUserId: string;
  name: string;
  image: string;
};

export default function WhoToFolllowComponent({
  targetUserId,
  image,
  name,
}: Props) {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">
        <Avatar image={image!} name={name!} />

        <p className="font-semibold">{name}</p>
      </div>
      {/* @ts-ignore */}
      <FollowButton targetUserId={targetUserId} />
    </div>
  );
}
