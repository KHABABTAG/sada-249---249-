import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { LanguageIcon } from './icons/LanguageIcon';

type View = 'home' | 'form' | 'archive';

interface HeaderProps {
  currentView: View;
  navigateTo: (view: View) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, navigateTo }) => {
  const { language, setLanguage, t } = useLanguage();
  
  const navLinkClasses = "px-3 py-2 rounded-md text-sm font-medium transition-colors";
  const activeLinkClasses = "bg-sky-100 text-sky-700";
  const inactiveLinkClasses = "hover:bg-slate-200";

  const toggleLanguage = () => {
    const newLang = language === 'en' ? 'ar' : 'en';
    setLanguage(newLang);
  };

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-slate-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <h1 className="text-xl md:text-2xl font-bold text-slate-900">
            Sada 249 <span className="text-slate-500">(صدى 249)</span>
          </h1>
          <div className="flex items-center gap-2 md:gap-4">
            <nav className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
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
            <button
              onClick={toggleLanguage}
              className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-slate-600 hover:bg-slate-200 transition-colors"
              aria-label="Toggle language"
            >
              <LanguageIcon />
              <span>{language === 'en' ? 'العربية' : 'English'}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;