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

export interface CreatorProps {
  video: Video;
  setEdit: any;
  edit: any;
}

export interface VideoEditProps {
  type: string;
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
