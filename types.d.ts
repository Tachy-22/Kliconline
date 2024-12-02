interface EventT {
  id: string;
  date: Date | { seconds: number; nanoseconds: number };
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
  date: Date | { seconds: number; nanoseconds: number };
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

  date: Date | { seconds: number; nanoseconds: number };

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
  date: Date | { seconds: number; nanoseconds: number };
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
  registrationDate: Date | { seconds: number; nanoseconds: number };
}
