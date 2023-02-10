type Video = {
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
};

export interface CardProps {
  type: string;
  video: Video;
}
