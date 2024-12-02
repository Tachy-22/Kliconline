interface EventT {
  id: string;
  date: string;
  title: string;
  description: string;
  time: string;
  location: string;
  mediaUrl?: string;
  images: string[];
  category?: string;
  status: "upcoming" | "past" | "cancelled";
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface Sermon {
  id: string;
  title: string;
  description: string;
  date: string;
  times: string[];
  location: string;
  type: string;
  createdAt: Date;
  updatedAt: Date;
}

interface SermonT {
  id?: string;

  title: string;

  description: string;

  date: string;

  preacher: string;

  videoUrl: string;

  audioUrl: string;

  category: string;

  isPublished: boolean;

  thumbnailUrl: string;

  [key: string]: unknown;
}

interface BlogT {
  id?: string;
  title: string;
  author: string;
  excerpt: string;
  imageUrls: string[];
  date: string;
  images?: string[];
  content: string;
  slug?: string;
  category: string;
  createdAt?: Date;
  updatedAt?: Date;
  [key: string]: unknown;
}

interface FileMetadata {
  url: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface ParticipantT {
  name: string;
  email: string;
  phone: string;
  registrationDate: string;
}
