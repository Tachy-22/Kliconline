// ...existing code...

type TestimonyT = {
  id?: string;
  author: string;
  content: string;
  date: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
  approved?: boolean;
}

interface SubscriberT {
  id: string;
  email: string;
  name?: string;
  status: "active" | "unsubscribed";
  createdAt: string;
}

interface NewsletterHistoryT {
  id: string;
  subject: string;
  content: string;
  sentAt: string;
  recipientCount: number;
}

type BranchT = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
  createdAt?: string;
  updatedAt?: string;
};

// ...existing code...