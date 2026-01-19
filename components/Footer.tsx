import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-white border-t border-slate-200 mt-auto">
      <div className="container mx-auto px-4 py-8 text-center text-slate-600">
        <p className="mb-4 text-sm">
          {t('footerText')}
        </p>
        <button className="bg-slate-700 text-white px-6 py-2 rounded-md hover:bg-slate-800 transition-colors text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
          {t('contactAdmin')}
        </button>
      </div>
    </footer>
  );
};

export default Footer;