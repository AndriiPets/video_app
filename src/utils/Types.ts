export type Video = {
  _id: string;
  userId: string;
  title: string;
  desc: string;
  imgUrl: string;
  videoUrl: string;
  views: number;
  tags: string[];
  likes: string[];
  dislikes: string[];
  createdAt: Date;
};

export type GetVideoResponce = {
  data: Video;
};

export interface CardProps {
  type: string;
  video: Video;
}

export interface Channel {
  name: string;
  email: string;
  password: string;
  image: string;
  subscribers?: number;
  subscribedUsers?: string[];
}
