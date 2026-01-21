
import React, { useState, useCallback, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import SubmissionForm from './components/SubmissionForm';
import PublicArchive from './components/PublicArchive';
import AdminDashboard from './components/AdminDashboard';
import Home from './components/Home';
import { LanguageProvider } from './contexts/LanguageContext';
import type { Testimony, TestimonySubmission } from './types';
import { HomeIcon } from './components/icons/HomeIcon';
import { PlusCircleIcon } from './components/icons/PlusCircleIcon';
import { BookOpenIcon } from './components/icons/BookOpenIcon';
import { api } from './services/api';

export type View = 'home' | 'form' | 'archive' | 'admin';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('home');
  const [testimonies, setTestimonies] = useState<Testimony[]>([]);
  const [loading, setLoading] = useState(false);

  // Load data
  const loadTestimonies = useCallback(async () => {
    setLoading(true);
    const data = await api.getTestimonies();
    setTestimonies(data);
    setLoading(false);
  }, []);

  // Initial Fetch
  useEffect(() => {
    loadTestimonies();
  }, [loadTestimonies]);

  // Robust Hash Routing
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['home', 'form', 'archive', 'admin'].includes(hash)) {
        setCurrentView(hash as View);
      } else if (!hash) {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    if (window.location.hash) handleHashChange();
    else window.location.hash = 'home';

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = useCallback((view: View) => {
    setCurrentView(view);
    window.location.hash = view;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Refresh data when navigating to archive or admin
    if (view === 'archive' || view === 'admin') {
      loadTestimonies();
    }
  }, [loadTestimonies]);

  const addTestimony = async (newTestimony: TestimonySubmission) => {
    const success = await api.createTestimony(newTestimony);
    if (success) {
      await loadTestimonies();
    }
    return Promise.resolve();
  };

  const updateTestimonyStatus = async (id: string, status: 'approved' | 'rejected') => {
    const success = await api.updateStatus(id, status);
    if (success) {
       // Optimistic update
       setTestimonies(prev => prev.map(t => t.id === id ? { ...t, status: status === 'approved' ? 'approved' : 'rejected' } : t));
    } else {
        alert("Failed to update status");
    }
  };

  const deleteTestimony = async (id: string) => {
    if(!window.confirm("Are you sure you want to delete this testimony?")) return;
    const success = await api.deleteTestimony(id);
    if (success) {
      setTestimonies(prev => prev.filter(t => t.id !== id));
    } else {
        alert("Failed to delete testimony");
    }
  };

  return (
    <LanguageProvider>
      <div className="bg-slate-50 min-h-screen text-slate-800 flex flex-col pb-20 md:pb-0">
        <Header currentView={currentView} navigateTo={navigateTo} />
        
        <main className="flex-grow container mx-auto px-4 py-6 md:py-12">
          <div className="max-w-5xl mx-auto">
            {currentView === 'home' && <Home onNavigate={navigateTo} />}
            
            {currentView === 'form' && <SubmissionForm onAdd={addTestimony} />}
            
            {currentView === 'archive' && (
              loading ? <div className="text-center py-20">Loading archive...</div> :
              <PublicArchive testimonies={testimonies.filter(t => t.status === 'approved')} />
            )}
            
            {currentView === 'admin' && (
               loading ? <div className="text-center py-20">Loading dashboard...</div> :
              <AdminDashboard 
                testimonies={testimonies} 
                onUpdateStatus={updateTestimonyStatus} 
                onDelete={deleteTestimony} 
              />
            )}
          </div>
        </main>

        <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-slate-200 flex justify-around items-center py-3 px-6 md:hidden z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
          <button onClick={() => navigateTo('home')} className={`flex flex-col items-center gap-1 ${currentView === 'home' ? 'text-sky-600' : 'text-slate-400'}`}>
            <HomeIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">الرئيسية</span>
          </button>
          <button onClick={() => navigateTo('form')} className={`flex flex-col items-center gap-1 ${currentView === 'form' ? 'text-sky-600' : 'text-slate-400'}`}>
            <PlusCircleIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">وثق</span>
          </button>
          <button onClick={() => navigateTo('archive')} className={`flex flex-col items-center gap-1 ${currentView === 'archive' ? 'text-sky-600' : 'text-slate-400'}`}>
            <BookOpenIcon className="w-6 h-6" />
            <span className="text-[10px] font-bold uppercase tracking-tighter">الأرشيف</span>
          </button>
        </nav>

        <Footer navigateTo={navigateTo} />
      </div>
    </LanguageProvider>
  );
};

export default App;
