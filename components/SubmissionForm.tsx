
import React, { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { RecordIcon } from './icons/RecordIcon';
import { StopIcon } from './icons/StopIcon';
import { UploadIcon } from './icons/UploadIcon';
import { ImageIcon } from './icons/ImageIcon';

interface SubmissionFormProps {
  onAdd: (testimony: any) => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ onAdd }) => {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [testimonyText, setTestimonyText] = useState('');
  const [publishAnonymously, setPublishAnonymously] = useState(false);
  const [consent, setConsent] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'recording' | 'stopped'>('idle');
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      mediaRecorderRef.current.ondataavailable = (event) => audioChunksRef.current.push(event.data);
      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        setAudioUrl(URL.createObjectURL(audioBlob));
        stream.getTracks().forEach(track => track.stop());
      };
      mediaRecorderRef.current.start();
      setRecordingStatus('recording');
    } catch (err) {
      alert("Microphone access denied.");
    }
  }, []);

  const stopRecording = () => {
    mediaRecorderRef.current?.stop();
    setRecordingStatus('stopped');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setImageUrl(URL.createObjectURL(file));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) return;
    
    setIsSubmitting(true);
    
    setTimeout(() => {
      onAdd({
        title: title || "Untitled Testimony",
        event,
        date,
        location,
        writtenText: testimonyText,
        author: publishAnonymously ? t('status_anonymous') : "Public Submitter",
        imageUrl: imageUrl || undefined,
        audioUrl: audioUrl || undefined,
      });
      
      setIsSubmitting(false);
      alert(t('submissionSuccess'));
      
      setTitle(''); setEvent(''); setDate(''); setLocation(''); setTestimonyText('');
      setConsent(false); setAudioUrl(null); setImageUrl(null); setRecordingStatus('idle');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-5 sm:p-10 rounded-3xl shadow-sm border border-slate-100">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">{t('formTitle')}</h2>
        <div className="h-1 w-16 bg-sky-500 mx-auto rounded-full mb-4"></div>
        <p className="text-slate-500 text-sm sm:text-base">{t('formSubtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('titleLabel')}</label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full px-4 py-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all bg-slate-50 text-slate-900 font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('eventLabel')}</label>
            <input type="text" required value={event} onChange={e => setEvent(e.target.value)} className="w-full px-4 py-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all bg-slate-50 text-slate-900 font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('locationLabel')}</label>
            <input type="text" required value={location} onChange={e => setLocation(e.target.value)} className="w-full px-4 py-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all bg-slate-50 text-slate-900 font-bold" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('dateLabel')}</label>
            <input type="date" required value={date} onChange={e => setDate(e.target.value)} className="w-full px-4 py-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all bg-slate-50 text-slate-900 font-bold" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-black text-slate-400 uppercase tracking-widest mb-2">{t('writtenLabel')}</label>
          <textarea required value={testimonyText} onChange={e => setTestimonyText(e.target.value)} rows={6} className="w-full px-4 py-4 rounded-2xl border border-slate-100 focus:ring-2 focus:ring-sky-500 focus:border-transparent outline-none transition-all bg-slate-50 resize-none text-slate-900 font-medium" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><ImageIcon /> {t('imageLabel')}</h3>
            <button type="button" onClick={() => imageInputRef.current?.click()} className="w-full py-3 px-4 bg-white border border-slate-200 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors shadow-sm">
              {imageUrl ? "تغيير الصورة" : "رفع صورة"}
            </button>
            <input type="file" ref={imageInputRef} hidden accept="image/*" onChange={handleImageUpload} />
            {imageUrl && <img src={imageUrl} className="mt-4 h-32 w-full object-cover rounded-xl border border-white shadow-md" />}
          </div>

          <div className="p-5 border-2 border-dashed border-slate-100 rounded-2xl bg-slate-50">
            <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2"><RecordIcon /> {t('audioLabel')}</h3>
            <div className="flex gap-2">
              <button 
                type="button" 
                onClick={recordingStatus === 'recording' ? stopRecording : startRecording} 
                className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold transition-all ${recordingStatus === 'recording' ? 'bg-red-500 text-white animate-pulse shadow-lg' : 'bg-white border border-slate-200 shadow-sm'}`}
              >
                {recordingStatus === 'recording' ? "إيقاف" : "تسجيل صوتي"}
              </button>
            </div>
            {audioUrl && <audio controls src={audioUrl} className="mt-4 w-full h-10" />}
          </div>
        </div>

        <div className="bg-sky-50/50 p-6 rounded-3xl border border-sky-100">
          <h3 className="text-xs font-black text-sky-900 uppercase tracking-widest mb-4">{t('consentLabel')}</h3>
          <div className="space-y-4">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" checked={publishAnonymously} onChange={e => setPublishAnonymously(e.target.checked)} className="w-6 h-6 rounded-lg border-sky-200 text-sky-600 focus:ring-sky-500" />
              <span className="text-sm text-sky-800 font-bold group-hover:text-sky-600 transition-colors">{t('publishAnonymously')}</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer group">
              <input type="checkbox" required checked={consent} onChange={e => setConsent(e.target.checked)} className="w-6 h-6 rounded-lg border-sky-200 text-sky-600 focus:ring-sky-500" />
              <span className="text-sm text-sky-800 font-black group-hover:text-sky-600 transition-colors">{t('consentCheckbox')}</span>
            </label>
          </div>
        </div>

        <button 
          type="submit" 
          disabled={!consent || isSubmitting}
          className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg hover:bg-slate-800 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-xl shadow-slate-200"
        >
          {isSubmitting ? "جاري الإرسال..." : t('submitTestimony')}
        </button>
      </form>
    </div>
  );
};

export default SubmissionForm;
