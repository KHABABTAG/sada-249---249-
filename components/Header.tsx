
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageIcon } from './icons/LanguageIcon';
import { View } from '../App';

interface HeaderProps {
  currentView: View;
  navigateTo: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, navigateTo }) => {
  const { language, setLanguage, t } = useLanguage();
  
  const navLinkClasses = "px-4 py-2 rounded-xl text-sm font-bold transition-all";
  const activeLinkClasses = "bg-slate-900 text-white shadow-lg shadow-slate-200";
  const inactiveLinkClasses = "text-slate-500 hover:bg-slate-100 hover:text-slate-900";

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  return (
    <header className="bg-white/80 backdrop-blur-xl sticky top-0 z-50 border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black group-hover:rotate-6 transition-transform">S</div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight">
              Sada 249 <span className="text-slate-400 font-medium hidden sm:inline">(صدى 249)</span>
            </h1>
          </div>

          <div className="flex items-center gap-2 md:gap-6">
            <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
              <button
                onClick={() => navigateTo('home')}
                className={`${navLinkClasses} ${currentView === 'home' ? activeLinkClasses : inactiveLinkClasses}`}
              >
                {t('home')}
              </button>
              <button
                onClick={() => navigateTo('form')}
                className={`${navLinkClasses} ${currentView === 'form' ? activeLinkClasses : inactiveLinkClasses}`}
              >
                {t('submitTestimony')}
              </button>
              <button
                onClick={() => navigateTo('archive')}
                className={`${navLinkClasses} ${currentView === 'archive' ? activeLinkClasses : inactiveLinkClasses}`}
              >
                {t('viewArchive')}
              </button>
            </nav>

            <div className="h-6 w-[1px] bg-slate-200 hidden md:block"></div>

            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-black uppercase tracking-widest text-slate-500 hover:bg-slate-100 transition-all border border-transparent hover:border-slate-200"
            >
              <LanguageIcon />
              <span>{language === 'en' ? 'AR' : 'EN'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
