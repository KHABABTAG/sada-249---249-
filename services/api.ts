
import { Testimony, TestimonySubmission } from '../types';

const API_URL = 'http://localhost:3000/api'; // عنوان السيرفر الخلفي

export const api = {
  // جلب جميع الشهادات
  getTestimonies: async (): Promise<Testimony[]> => {
    try {
      const response = await fetch(`${API_URL}/testimonies`);
      if (!response.ok) throw new Error('Failed to fetch testimonies');
      return await response.json();
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
    
    // إضافة الملفات إذا وجدت
    if (data.imageFile) formData.append('image', data.imageFile);
    if (data.audioBlob) formData.append('audio', data.audioBlob, 'recording.wav');

    try {
      const response = await fetch(`${API_URL}/testimonies`, {
        method: 'POST',
        body: formData, // المتصفح سيضع الـ Content-Type تلقائياً
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
