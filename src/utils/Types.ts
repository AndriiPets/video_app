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
  _id?: string;
  name: string;
  email: string;
  password: string;
  image: string;
  subscribers?: number;
  subscribedUsers?: string[];
}

export interface CommentType {
  _id: string;
  userId: string;
  videoUd: string;
  desc: string;
  createdAt: Date;
}
