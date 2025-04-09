export interface SubscriberData {
  email: string;
  subscribedAt: string;
  status: 'active' | 'pending' | 'unsubscribed';
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  query: string;
  message: string;
  submissionDate: string;
  replied: boolean;
}