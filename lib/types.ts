export type Post = {
  title: string;
  content?: string;
  id: string;
  date: string;
  name: string;
  userId: string;
  image: string;
  commentNumber: number;
  likesNumber: number;
  followers?: number;
  following?: number;
  bio: string;
  retweetsNumber: number;
};
