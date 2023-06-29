import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Avatar from "../Avatar";
import ProfileHoverCard from "../postCard/HoverCard";
import { Likes, User, Retweets } from "@prisma/client";

type LikesRts = Likes[] | Retweets[];
type Props = {
  dialogTrigerTitle?: string | number;
  value: any;
  followers?: number;
  retweets?: number;
  dialogTitle: string;
  title: string;
};
export default function PostDialog({
  dialogTrigerTitle,
  dialogTitle,
  title,
  value,
}: Props) {
  return (
    <Dialog>
      <DialogTrigger>
        <p className="flex items-center gap-1">
          <span className="text-base font-semibold text-gray-700">
            {dialogTrigerTitle}
          </span>
          {title}
        </p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{dialogTitle}</DialogTitle>
          {value?.map((item: any) => (
            <DialogDescription
              key={item.id}
              className="flex items-center gap-1 font-semibold text-gray-700"
            >
              <Avatar image={item?.user?.image!} name={item?.user?.name!} />

              {item.user.name}
            </DialogDescription>
          ))}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
