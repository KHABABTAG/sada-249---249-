
export interface Testimony {
  id: string; // تم التغيير من number إلى string لتناسب DynamoDB/Amplify
  title: string;
  event: string;
  date: string;
  location: string;
  writtenText: string;
  audioUrl?: string; 
  imageUrl?: string; 
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
  imageFile?: File; 
  audioBlob?: Blob; 
  audioUrl?: string; 
  imageUrl?: string; 
}
