
import { Testimony, TestimonySubmission } from '../types';

const BASE_URL = 'http://localhost:3000';
const API_URL = `${BASE_URL}/api`;

// دالة مساعدة لإصلاح الروابط (تتعامل مع مشاكل المسارات في ويندوز والروابط النسبية)
const normalizeUrl = (path: string | undefined | null): string | undefined => {
  if (!path) return undefined;
  
  // استبدال الشرطة المائلة العكسية (Windows style) بالعادية
  const cleanPath = path.replace(/\\/g, '/');
  
  // إذا كان الرابط كاملاً، نعيده كما هو (بعد إصلاح الشرطات)
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    return cleanPath;
  }
  
  // إذا كان الرابط نسبياً، نضيف عنوان السيرفر
  // مثال: uploads/image.jpg -> http://localhost:3000/uploads/image.jpg
  const relativePath = cleanPath.startsWith('/') ? cleanPath.substring(1) : cleanPath;
  return `${BASE_URL}/${relativePath}`;
};

export const api = {
  // جلب جميع الشهادات
  getTestimonies: async (): Promise<Testimony[]> => {
    try {
      const response = await fetch(`${API_URL}/testimonies`);
      if (!response.ok) throw new Error('Failed to fetch testimonies');
      
      const data = await response.json();
      
      // معالجة البيانات وإصلاح الروابط قبل إرجاعها للتطبيق
      return data.map((item: any) => ({
        ...item,
        imageUrl: normalizeUrl(item.imageUrl),
        audioUrl: normalizeUrl(item.audioUrl)
      }));
    } catch (error) {
      console.error('API Error:', error);
      return [];
    }
  },

  // إرسال شهادة جديدة (بما في ذلك الملفات)
  createTestimony: async (data: TestimonySubmission): Promise<boolean> => {
    const formData = new FormData();
    formData.append('title', data.title);
    formData.append('event', data.event);
    formData.append('date', data.date);
    formData.append('location', data.location);
    formData.append('writtenText', data.writtenText);
    formData.append('author', data.author);
    
    // تأكد من أن أسماء الحقول تطابق ما يتوقعه multer في السيرفر (image, audio)
    if (data.imageFile) formData.append('image', data.imageFile);
    if (data.audioBlob) formData.append('audio', data.audioBlob, 'recording.wav');

    try {
      const response = await fetch(`${API_URL}/testimonies`, {
        method: 'POST',
        body: formData,
      });
      return response.ok;
    } catch (error) {
      console.error('Submission Error:', error);
      return false;
    }
  },

  // تحديث حالة الشهادة (قبول/رفض)
  updateStatus: async (id: number, status: 'approved' | 'rejected'): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/testimonies/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      return response.ok;
    } catch (error) {
      console.error('Update Error:', error);
      return false;
    }
  },

  // حذف شهادة
  deleteTestimony: async (id: number): Promise<boolean> => {
    try {
      const response = await fetch(`${API_URL}/testimonies/${id}`, {
        method: 'DELETE',
      });
      return response.ok;
    } catch (error) {
      console.error('Delete Error:', error);
      return false;
    }
  }
};
