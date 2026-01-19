import React, { useState, useRef, useCallback } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { RecordIcon } from './icons/RecordIcon';
import { StopIcon } from './icons/StopIcon';
import { UploadIcon } from './icons/UploadIcon';
import { ImageIcon } from './icons/ImageIcon';

type RecordingStatus = 'idle' | 'recording' | 'stopped';

const SubmissionForm: React.FC = () => {
  const { t } = useLanguage();
  const [title, setTitle] = useState('');
  const [event, setEvent] = useState('');
  const [date, setDate] = useState('');
  const [location, setLocation] = useState('');
  const [testimony, setTestimony] = useState('');
  const [publishAnonymously, setPublishAnonymously] = useState(false);
  const [consent, setConsent] = useState(false);

  const [recordingStatus, setRecordingStatus] = useState<RecordingStatus>('idle');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioFileInputRef = useRef<HTMLInputElement>(null);

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioUrl(audioUrl);
        setAudioFile(new File([audioBlob], "recorded_testimony.wav"));
        stream.getTracks().forEach(track => track.stop()); // Stop microphone access
      };

      mediaRecorderRef.current.start();
      setRecordingStatus('recording');
      setAudioUrl(null);
      setAudioFile(null);
    } catch (err) {
      console.error("Error accessing microphone:", err);
      alert(t('microphoneError'));
    }
  }, [t]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recordingStatus === 'recording') {
      mediaRecorderRef.current.stop();
      setRecordingStatus('stopped');
    }
  }, [recordingStatus]);

  const handleAudioUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAudioFile(file);
      setAudioUrl(URL.createObjectURL(file));
      setRecordingStatus('idle');
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
        alert(t('consentRequired'));
        return;
    }
    const formData = {
        title,
        event,
        date,
        location,
        testimony,
        audioFile,
        imageFile,
        publishAnonymously,
        consent,
    };
    console.log("Form Submitted:", formData);
    alert(t('submissionSuccess'));
    // Reset form
    setTitle('');
    setEvent('');
    setDate('');
    setLocation('');
    setTestimony('');
    setPublishAnonymously(false);
    setConsent(false);
    setAudioFile(null);
    setAudioUrl(null);
    setRecordingStatus('idle');
    setImageFile(null);
    setImageUrl(null);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 sm:p-8 rounded-xl shadow-sm border border-slate-200">
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">{t('formTitle')}</h2>
        <p className="text-slate-600 mt-2">{t('formSubtitle')}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-1">{t('titleLabel')}</label>
          <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} placeholder={t('titlePlaceholder')} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"/>
        </div>

        <div>
          <label htmlFor="event" className="block text-sm font-medium text-slate-700 mb-1">{t('eventLabel')}</label>
          <input type="text" id="event" value={event} onChange={(e) => setEvent(e.target.value)} placeholder={t('eventPlaceholder')} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"/>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <label htmlFor="date" className="block text-sm font-medium text-slate-700 mb-1">{t('dateLabel')}</label>
                <input type="date" id="date" value={date} onChange={(e) => setDate(e.target.value)} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"/>
            </div>
            <div>
                <label htmlFor="location" className="block text-sm font-medium text-slate-700 mb-1">{t('locationLabel')}</label>
                <input type="text" id="location" value={location} onChange={(e) => setLocation(e.target.value)} required placeholder={t('locationPlaceholder')} className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"/>
            </div>
        </div>

        <div>
          <label htmlFor="testimony" className="block text-sm font-medium text-slate-700 mb-1">{t('writtenLabel')}</label>
          <textarea id="testimony" value={testimony} onChange={(e) => setTestimony(e.target.value)} rows={8} required className="w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500" placeholder={t('writtenPlaceholder')}></textarea>
        </div>

        <div>
            <h3 className="text-sm font-medium text-slate-700 mb-2">{t('audioLabel')}</h3>
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                  <button type="button" onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 border rounded-md text-sm font-semibold transition-all ${recordingStatus === 'recording' ? 'bg-red-100 border-red-500 text-red-600 hover:bg-red-200' : 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'}`}>
                    {recordingStatus === 'recording' ? <> <StopIcon /> {t('stopRecording')} </> : <> <RecordIcon /> {t('recordAudio')} </>}
                  </button>
                  <button type="button" onClick={() => audioFileInputRef.current?.click()} className="flex-1 flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-md text-sm font-semibold bg-white text-slate-700 hover:bg-slate-100 transition-colors">
                    <UploadIcon /> {t('uploadAudio')}
                  </button>
                  <input type="file" ref={audioFileInputRef} onChange={handleAudioUpload} accept=".mp3,.wav" className="hidden"/>
              </div>
              {audioUrl && (
                  <div className="bg-slate-100 p-3 rounded-md">
                      <p className="text-sm font-medium text-slate-800 mb-2">{t('audioPreview')}:</p>
                      <audio controls src={audioUrl} className="w-full"></audio>
                  </div>
              )}
            </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">{t('imageLabel')}</h3>
          <div className="space-y-4">
              <button type="button" onClick={() => imageInputRef.current?.click()} className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-slate-300 rounded-md text-sm font-semibold bg-white text-slate-700 hover:bg-slate-100 transition-colors">
                <ImageIcon /> {t('uploadImage')}
              </button>
              <input type="file" ref={imageInputRef} onChange={handleImageUpload} accept="image/png, image/jpeg, image/gif" className="hidden"/>
              {imageUrl && (
                  <div className="bg-slate-100 p-3 rounded-md">
                      <p className="text-sm font-medium text-slate-800 mb-2">{t('imagePreview')}:</p>
                      <img src={imageUrl} alt="Image preview" className="rounded-md max-h-60 w-auto mx-auto"/>
                  </div>
              )}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-slate-700 mb-2">{t('consentLabel')}</h3>
          <div className="space-y-3">
              <div className="flex items-start">
                  <input id="anonymously" type="checkbox" checked={publishAnonymously} onChange={(e) => setPublishAnonymously(e.target.checked)} className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 mt-0.5"/>
                  <label htmlFor="anonymously" className="ms-3 text-sm text-slate-600">{t('publishAnonymously')}</label>
              </div>
              <div className="flex items-start">
                  <input id="consent" type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="h-4 w-4 text-sky-600 border-slate-300 rounded focus:ring-sky-500 mt-0.5"/>
                  <label htmlFor="consent" className="ms-3 text-sm text-slate-600">{t('consentCheckbox')}</label>
              </div>
          </div>
        </div>

        <div className="pt-4">
          <button type="submit" disabled={!consent} className="w-full bg-sky-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-sky-700 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 disabled:bg-slate-400 disabled:cursor-not-allowed">
            {t('submitTestimony')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SubmissionForm;