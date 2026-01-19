
export interface Testimony {
  id: number;
  title: string;
  event: string;
  date: string;
  location: string;
  writtenText: string;
  audioUrl?: string;
  imageUrl?: string;
  status: 'approved' | 'pending' | 'rejected';
  author: string;
}
