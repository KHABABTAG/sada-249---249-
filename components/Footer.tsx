
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { View } from '../App';

interface FooterProps {
  navigateTo?: (view: View) => void;
}

const Footer: React.FC<FooterProps> = ({ navigateTo }) => {
  const { t } = useLanguage();
  return (
    <footer className="bg-white border-t border-slate-100 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-start max-w-md">
            <h3 className="font-black text-slate-900 text-lg mb-2">Sada 249</h3>
            <p className="text-slate-500 text-sm leading-relaxed">
              {t('footerText')}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-4">
            <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl hover:bg-slate-800 transition-all text-sm font-bold shadow-xl shadow-slate-200">
              {t('contactAdmin')}
            </button>
            
            {navigateTo && (
              <button 
                onClick={() => navigateTo('admin')}
                className="text-[10px] text-slate-300 hover:text-slate-500 font-bold uppercase tracking-[0.2em] transition-colors"
              >
                Moderator Access
              </button>
            )}
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-50 flex justify-center text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Sada 249 Archive. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
