
import React, { useState } from 'react';
import type { Testimony } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { MegaphoneIcon } from './icons/MegaphoneIcon';
import { CalendarIcon } from './icons/CalendarIcon';
import { MapPinIcon } from './icons/MapPinIcon';

interface StoryCardProps {
  testimony: Testimony;
}

export const StoryCard: React.FC<StoryCardProps> = ({ testimony }) => {
  const { t } = useLanguage();
  const { title, event, date, location, writtenText, audioUrl, imageUrl } = testimony;
  const [imageError, setImageError] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col h-full hover:shadow-md hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {imageUrl && !imageError && (
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-40 object-cover" 
          onError={() => setImageError(true)}
        />
      )}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <div className="mt-2 mb-4 text-xs text-slate-500 space-y-2">
              <p className="flex items-center gap-2">
                  <MegaphoneIcon /> 
                  <span><span className="font-semibold">{t('event')}:</span> {event}</span>
              </p>
              <p className="flex items-center gap-2">
                  <CalendarIcon />
                  <span><span className="font-semibold">{t('date')}:</span> {new Date(date).toLocaleDateString()}</span>
              </p>
              <p className="flex items-center gap-2">
                  <MapPinIcon />
                  <span><span className="font-semibold">{t('location')}:</span> {location}</span>
              </p>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            {writtenText}
          </p>
        </div>
        {audioUrl && (
          <div className="mt-6 pt-4 border-t border-slate-200">
            <audio controls src={audioUrl} className="w-full h-10">
              Your browser does not support the audio element.
            </audio>
          </div>
        )}
      </div>
    </div>
  );
};
