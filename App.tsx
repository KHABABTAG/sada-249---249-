import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SubmissionForm from './components/SubmissionForm';
import PublicArchive from './components/PublicArchive';
import Home from './components/Home';
import { LanguageProvider } from './contexts/LanguageContext';

type View = 'home' | 'form' | 'archive';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
    window.scrollTo(0, 0);
  }, []);

  return (
    <LanguageProvider>
      <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col">
        <Header currentView={currentView} navigateTo={navigateTo} />
        <main className="flex-grow container mx-auto px-4 py-8 md:py-12">
          {currentView === 'home' && <Home />}
          {currentView === 'form' && <SubmissionForm />}
          {currentView === 'archive' && <PublicArchive />}
        </main>
        <Footer />
      </div>
    </LanguageProvider>
  );
};

export default App;