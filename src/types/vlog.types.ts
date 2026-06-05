export type PublicVlog = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string;
  videoUrl: string | null;
  viewCount: number;
  likeCount: number;
  createdAt: Date;
  updatedAt: Date;
  user: {
    id: string;
    name: string;
    image: string | null;
    username: string | null;
  };
};

