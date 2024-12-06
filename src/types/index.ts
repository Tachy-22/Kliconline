
export interface SubscriberData {
  email: string;
  subscribedAt: string;
  status: 'active' | 'pending' | 'unsubscribed';
}