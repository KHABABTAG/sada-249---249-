
import React, { useState, useMemo } from 'react';
import type { Testimony } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { EyeIcon } from './icons/EyeIcon';
import { CheckCircleIcon } from './icons/CheckCircleIcon';
import { XCircleIcon } from './icons/XCircleIcon';
import { TrashIcon } from './icons/TrashIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';

interface AdminDashboardProps {
  testimonies: Testimony[];
  onUpdateStatus: (id: number, status: Testimony['status']) => void;
  onDelete: (id: number) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ testimonies, onUpdateStatus, onDelete }) => {
  const { t, language } = useLanguage();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all');
  const [selectedTestimony, setSelectedTestimony] = useState<Testimony | null>(null);

  const stats = useMemo(() => ({
    total: testimonies.length,
    pending: testimonies.filter(t => t.status === 'pending').length,
    approved: testimonies.filter(t => t.status === 'approved').length,
  }), [testimonies]);

  const filteredList = useMemo(() => {
    if (filter === 'all') return testimonies;
    return testimonies.filter(t => t.status === filter);
  }, [testimonies, filter]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real production app, this would be handled via a secure backend.
    // Default system access code for deployment.
    if (password === 'admin249') {
      setIsAuthenticated(true);
    } else {
      alert("Access Denied: Invalid Credentials.");
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-2xl border border-slate-100 text-center animate-in zoom-in-95 duration-300">
        <div className="bg-slate-900 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 text-white shadow-xl shadow-slate-200">
          <ShieldCheckIcon />
        </div>
        <h2 className="text-2xl font-black text-slate-900 mb-2">منطقة محظورة</h2>
        <p className="text-slate-500 mb-8 text-sm font-medium">يرجى إدخال رمز الوصول للمشرفين للمتابعة.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="password" 
            placeholder="كلمة المرور" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-5 py-4 rounded-2xl border border-slate-100 outline-none focus:ring-2 focus:ring-slate-900 bg-slate-50 font-bold"
          />
          <button type="submit" className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
            دخول النظام
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900">{t('admin')}</h2>
          <div className="h-1.5 w-12 bg-sky-500 rounded-full mt-2"></div>
          <p className="text-slate-500 mt-4 font-bold text-sm tracking-widest uppercase">Moderation Workspace / Security Level: High</p>
        </div>
        <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200 w-full md:w-auto overflow-x-auto">
          {(['all', 'pending', 'approved', 'rejected'] as const).map(s => (
            <button
              key={s}
              onClick={() => setFilter(s)}
              className={`px-4 py-2.5 text-[10px] font-black uppercase tracking-widest rounded-xl transition-all whitespace-nowrap ${filter === s ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { label: t('admin_stats_total'), val: stats.total, color: 'text-slate-900', border: 'border-b-slate-900' },
          { label: t('admin_stats_pending'), val: stats.pending, color: 'text-amber-600', border: 'border-b-amber-500' },
          { label: t('admin_stats_approved'), val: stats.approved, color: 'text-emerald-600', border: 'border-b-emerald-500' }
        ].map(card => (
          <div key={card.label} className={`bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 border-b-8 ${card.border} transition-transform hover:-translate-y-1`}>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">{card.label}</p>
            <p className={`text-5xl font-black ${card.color}`}>{card.val}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-start">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-8 py-5 text-start text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('table_header_title')}</th>
                <th className="px-8 py-5 text-start text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('table_header_location')}</th>
                <th className="px-8 py-5 text-start text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('table_header_status')}</th>
                <th className="px-8 py-5 text-end text-[10px] font-black text-slate-400 uppercase tracking-widest">{t('table_header_actions')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {filteredList.length > 0 ? filteredList.map(t => (
                <tr key={t.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-8 py-6">
                    <p className="font-black text-slate-900 text-lg leading-tight">{t.title}</p>
                    <p className="text-xs text-slate-400 font-bold mt-1 uppercase tracking-tighter">{t.event}</p>
                  </td>
                  <td className="px-8 py-6 text-sm text-slate-600 font-bold">{t.location}</td>
                  <td className="px-8 py-6 whitespace-nowrap">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase border ${
                      t.status === 'approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                      t.status === 'pending' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                      'bg-red-50 text-red-700 border-red-200'
                    }`}>
                      {t.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-end space-x-2 rtl:space-x-reverse opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setSelectedTestimony(t)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-sky-600 hover:border-sky-200 transition-all shadow-sm"><EyeIcon /></button>
                    <button onClick={() => onUpdateStatus(t.id, 'approved')} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-emerald-600 hover:border-emerald-200 transition-all shadow-sm"><CheckCircleIcon /></button>
                    <button onClick={() => onUpdateStatus(t.id, 'rejected')} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-amber-600 hover:border-amber-200 transition-all shadow-sm"><XCircleIcon /></button>
                    <button onClick={() => onDelete(t.id)} className="p-3 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-red-600 hover:border-red-200 transition-all shadow-sm"><TrashIcon /></button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={4} className="px-8 py-20 text-center">
                    <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <ShieldCheckIcon />
                    </div>
                    <p className="text-slate-400 font-bold">لا توجد شهادات حالياً للمراجعة.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {selectedTestimony && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl">
          <div className="bg-white rounded-[3rem] shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-slate-50/50">
              <h3 className="text-2xl font-black text-slate-900 leading-tight">{selectedTestimony.title}</h3>
              <button onClick={() => setSelectedTestimony(null)} className="w-12 h-12 rounded-2xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 font-black hover:bg-slate-100 transition-colors shadow-sm">✕</button>
            </div>
            <div className="p-8 overflow-y-auto space-y-8">
              <div className="grid grid-cols-2 gap-6 p-6 bg-slate-50 rounded-3xl border border-slate-100">
                <div><p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Event</p><p className="font-bold text-slate-900">{selectedTestimony.event}</p></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Location</p><p className="font-bold text-slate-900">{selectedTestimony.location}</p></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Author</p><p className="font-bold text-slate-900">{selectedTestimony.author}</p></div>
                <div><p className="text-[10px] font-black text-slate-400 uppercase mb-1 tracking-widest">Status</p><p className="font-black uppercase text-sky-600">{selectedTestimony.status}</p></div>
              </div>
              {selectedTestimony.imageUrl && <img src={selectedTestimony.imageUrl} className="w-full rounded-[2rem] shadow-xl border-8 border-white" />}
              <p className="text-xl text-slate-700 leading-relaxed font-medium ps-8 border-s-4 border-slate-200">
                {selectedTestimony.writtenText}
              </p>
              {selectedTestimony.audioUrl && (
                <div className="bg-slate-900 p-6 rounded-[2rem] shadow-inner">
                  <p className="text-[10px] font-black text-slate-400 uppercase mb-4 tracking-widest">Audio Recording</p>
                  <audio controls src={selectedTestimony.audioUrl} className="w-full invert opacity-80" />
                </div>
              )}
            </div>
            <div className="p-8 bg-slate-50/50 border-t border-slate-50 flex justify-end gap-4">
              <button 
                onClick={() => { onUpdateStatus(selectedTestimony.id, 'approved'); setSelectedTestimony(null); }} 
                className="px-10 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:scale-105 transition-transform shadow-xl shadow-slate-200"
              >
                Publish Testimony
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
