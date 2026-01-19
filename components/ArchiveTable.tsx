
import React from 'react';
import type { Testimony } from '../types';
import { useLanguage } from '../contexts/LanguageContext';

interface ArchiveTableProps {
  testimonies: Testimony[];
}

export const ArchiveTable: React.FC<ArchiveTableProps> = ({ testimonies }) => {
  const { t, language } = useLanguage();

  const getStatusColor = (status: Testimony['status']) => {
    switch (status) {
      case 'approved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'pending': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'rejected': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-sm border border-slate-200">
      <table className="w-full text-start border-collapse">
        <thead className="bg-slate-50 border-b border-slate-200">
          <tr>
            <th className="px-6 py-4 text-start text-xs font-bold text-slate-500 uppercase tracking-wider">{t('table_header_date')}</th>
            <th className="px-6 py-4 text-start text-xs font-bold text-slate-500 uppercase tracking-wider">{t('table_header_title')}</th>
            <th className="px-6 py-4 text-start text-xs font-bold text-slate-500 uppercase tracking-wider">{t('table_header_location')}</th>
            <th className="px-6 py-4 text-start text-xs font-bold text-slate-500 uppercase tracking-wider">{t('table_header_event')}</th>
            <th className="px-6 py-4 text-start text-xs font-bold text-slate-500 uppercase tracking-wider">{t('table_header_author')}</th>
            <th className="px-6 py-4 text-start text-xs font-bold text-slate-500 uppercase tracking-wider">{t('table_header_status')}</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {testimonies.map((testimony) => (
            <tr key={testimony.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                {new Date(testimony.date).toLocaleDateString(language === 'ar' ? 'ar-SD' : 'en-US')}
              </td>
              <td className="px-6 py-4 text-sm font-semibold text-slate-900">
                {testimony.title}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600">
                {testimony.location}
              </td>
              <td className="px-6 py-4 text-sm text-slate-600 italic">
                {testimony.event}
              </td>
              <td className="px-6 py-4 text-sm text-slate-500">
                {testimony.author}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(testimony.status)}`}>
                  {t(`status_${testimony.status}`)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
