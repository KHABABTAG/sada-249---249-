
import { Testimony, TestimonySubmission } from '../types';

// محاكاة لبيئة Amplify/NoSQL باستخدام LocalStorage
// هذا يلغي الاعتماد على MySQL ويجهز البيانات لتكون بصیغة JSON
const STORAGE_KEY = 'sada249_data';

// دالة مساعدة لتوليد معرفات فريدة (UUID) كما في Amplify
const generateId = (): string => {
  return crypto.randomUUID ? crypto.randomUUID() : Date.now().toString();
};

// دالة مساعدة لتحويل الملفات إلى Base64 (لمحاكاة تخزين S3 محلياً)
const fileToBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

// تحميل البيانات الأولية
const getStoredData = (): Testimony[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  return JSON.parse(stored);
};

const saveStoredData = (data: Testimony[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

export const api = {
  // جلب جميع الشهادات
  getTestimonies: async (): Promise<Testimony[]> => {
    // محاكاة تأخير الشبكة
    await new Promise(resolve => setTimeout(resolve, 500));
    return getStoredData();
  },

  // إرسال شهادة جديدة
  createTestimony: async (data: TestimonySubmission): Promise<boolean> => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      
      let finalImageUrl = data.imageUrl;
      let finalAudioUrl = data.audioUrl;

      // محاكاة رفع الملفات بتحويلها إلى Base64 للتخزين المحلي
      if (data.imageFile) {
        finalImageUrl = await fileToBase64(data.imageFile);
      }
      
      if (data.audioBlob) {
        finalAudioUrl = await fileToBase64(data.audioBlob);
      }

      const newTestimony: Testimony = {
        id: generateId(), // استخدام UUID بدلاً من Auto Increment
        title: data.title,
        event: data.event,
        date: data.date,
        location: data.location,
        writtenText: data.writtenText,
        author: data.author,
        status: 'pending', // الحالة الافتراضية
        imageUrl: finalImageUrl,
        audioUrl: finalAudioUrl,
        createdAt: new Date().toISOString()
      };

      const currentData = getStoredData();
      const updatedData = [newTestimony, ...currentData];
      saveStoredData(updatedData);

      return true;
    } catch (error) {
      console.error('Error creating testimony:', error);
      return false;
    }
  },

  // تحديث حالة الشهادة
  updateStatus: async (id: string, status: 'approved' | 'rejected'): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const currentData = getStoredData();
    const updatedData = currentData.map(t => 
      t.id === id ? { ...t, status } : t
    );
    saveStoredData(updatedData);
    return true;
  },

  // حذف شهادة
  deleteTestimony: async (id: string): Promise<boolean> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const currentData = getStoredData();
    const updatedData = currentData.filter(t => t.id !== id);
    saveStoredData(updatedData);
    return true;
  }
};
