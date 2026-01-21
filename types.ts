
export interface Testimony {
  id: number;
  title: string;
  event: string;
  date: string;
  location: string;
  writtenText: string;
  audioUrl?: string; // URL قادم من السيرفر
  imageUrl?: string; // URL قادم من السيرفر
  status: 'approved' | 'pending' | 'rejected';
  author: string;
  createdAt?: string;
}

export interface TestimonySubmission {
  title: string;
  event: string;
  date: string;
  location: string;
  writtenText: string;
  author: string;
  imageFile?: File; // الملف الخام للرفع
  audioBlob?: Blob; // الملف الصوتي الخام للرفع
  audioUrl?: string; // للمعاينة فقط
  imageUrl?: string; // للمعاينة فقط
}
