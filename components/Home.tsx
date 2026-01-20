
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { SparklesIcon } from './icons/SparklesIcon';
import { BookOpenIcon } from './icons/BookOpenIcon';
import { BridgeIcon } from './icons/BridgeIcon';
import { UserHeartIcon } from './icons/UserHeartIcon';
import { UsersIcon } from './icons/UsersIcon';
import { ShieldCheckIcon } from './icons/ShieldCheckIcon';
import { SunIcon } from './icons/SunIcon';
import { HeartBrokenIcon } from './icons/HeartBrokenIcon';
import { BrainIcon } from './icons/BrainIcon';
import { ShareIcon } from './icons/ShareIcon';
import { PlusCircleIcon } from './icons/PlusCircleIcon';
import { View } from '../App';

interface HomeProps {
    onNavigate: (view: View) => void;
}

const SectionHeader: React.FC<{ title: string; icon: React.ReactNode }> = ({ title, icon }) => (
    <div className="flex flex-col items-center md:items-start gap-3 mb-8">
        <div className="bg-slate-900 text-white p-3 rounded-2xl shadow-lg shadow-slate-200">
            {icon}
        </div>
        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 text-center md:text-start leading-tight">
            {title}
        </h2>
        <div className="h-1.5 w-12 bg-sky-500 rounded-full"></div>
    </div>
);

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; text: string; colorClass?: string }> = ({ icon, title, text, colorClass = "bg-slate-50 border-slate-100" }) => (
    <div className={`p-6 rounded-3xl border transition-all duration-300 ${colorClass}`}>
        <div className="flex items-center gap-4 mb-4">
            <div className="p-2.5 bg-white rounded-xl shadow-sm flex-shrink-0">
                {icon}
            </div>
            <h4 className="font-black text-slate-900 text-lg leading-tight">{title}</h4>
        </div>
        <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
    </div>
);

const Home: React.FC<HomeProps> = ({ onNavigate }) => {
    const { t } = useLanguage();

    const missionCards = [
        { icon: <BookOpenIcon className="w-5 h-5" />, title: t('home_section2_li1_title'), text: t('home_section2_li1_text'), color: "bg-blue-50/50 border-blue-100" },
        { icon: <BridgeIcon className="w-5 h-5" />, title: t('home_section2_li2_title'), text: t('home_section2_li2_text'), color: "bg-indigo-50/50 border-indigo-100" },
        { icon: <UserHeartIcon className="w-5 h-5" />, title: t('home_section2_li3_title'), text: t('home_section2_li3_text'), color: "bg-rose-50/50 border-rose-100" },
        { icon: <UsersIcon className="w-5 h-5" />, title: t('home_section2_li4_title'), text: t('home_section2_li4_text'), color: "bg-emerald-50/50 border-emerald-100" },
    ];

    const focusCards = [
        { icon: <ShieldCheckIcon className="w-5 h-5" />, title: t('home_section3_li1_title'), text: t('home_section3_li1_text'), color: "bg-slate-50 border-slate-200" },
        { icon: <SunIcon className="w-5 h-5" />, title: t('home_section3_li2_title'), text: t('home_section3_li2_text'), color: "bg-orange-50/50 border-orange-100" },
        { icon: <HeartBrokenIcon className="w-5 h-5" />, title: t('home_section3_li3_title'), text: t('home_section3_li3_text'), color: "bg-red-50/50 border-red-100" },
        { icon: <BrainIcon className="w-5 h-5" />, title: t('home_section3_li4_title'), text: t('home_section3_li4_text'), color: "bg-purple-50/50 border-purple-100" },
    ];

    return (
        <div className="space-y-16 sm:space-y-24">
            {/* Hero Section */}
            <header className="text-center px-4 py-10 md:py-20 bg-white rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-sky-400 via-indigo-500 to-emerald-400"></div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sky-50 text-sky-700 rounded-full text-[10px] font-black uppercase tracking-[0.2em] mb-8">
                    <SparklesIcon />
                    <span>Sudan Humanitarian Archive</span>
                </div>
                <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-slate-900 mb-8 leading-[1.2] px-2">
                    {t('home_title')}
                </h1>
                <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed px-4 mb-10">
                    {t('home_subtitle')}
                </p>
                <div className="flex flex-col sm:flex-row justify-center gap-4 px-4">
                  <button onClick={() => onNavigate('form')} className="px-8 py-4 bg-slate-900 text-white rounded-2xl font-bold hover:scale-105 transition-transform shadow-lg shadow-slate-200">
                    {t('submitTestimony')}
                  </button>
                  <button onClick={() => onNavigate('archive')} className="px-8 py-4 bg-white text-slate-900 border border-slate-200 rounded-2xl font-bold hover:bg-slate-50 transition-colors">
                    {t('viewArchive')}
                  </button>
                </div>
            </header>

            {/* Section 1: Who We Are */}
            <section className="px-2">
                <SectionHeader title={t('home_section1_title')} icon={<SparklesIcon />} />
                <div className="bg-white p-6 sm:p-12 rounded-[2.5rem] shadow-sm border border-slate-100">
                    <div className="space-y-6 text-base sm:text-xl leading-relaxed text-slate-700 font-medium">
                        <p className="text-slate-900 font-black text-xl sm:text-2xl">{t('home_section1_p1')}</p>
                        <p>{t('home_section1_p2')}</p>
                        <p className="ps-4 border-s-4 border-sky-400 italic text-slate-600 bg-slate-50 py-4 rounded-e-2xl">{t('home_section1_p3')}</p>
                    </div>
                </div>
            </section>

            {/* Section 2: Our Mission */}
            <section className="px-2">
                <SectionHeader title={t('home_section2_title')} icon={<BookOpenIcon className="w-6 h-6" />} />
                <div className="mb-10 text-center md:text-start px-4">
                    <p className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{t('home_section2_p1')}</p>
                    <p className="text-slate-500">{t('home_section2_p2')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {missionCards.map(card => (
                        <FeatureCard key={card.title} icon={card.icon} title={card.title} text={card.text} colorClass={card.color} />
                    ))}
                </div>
            </section>

            {/* Section 3: Focus */}
            <section className="px-2">
                <SectionHeader title={t('home_section3_title')} icon={<UsersIcon className="w-6 h-6" />} />
                <div className="mb-10 text-center md:text-start px-4">
                    <p className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{t('home_section3_p1')}</p>
                    <p className="text-slate-500">{t('home_section3_p2')}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {focusCards.map(card => (
                        <FeatureCard key={card.title} icon={card.icon} title={card.title} text={card.text} colorClass={card.color} />
                    ))}
                </div>
                <div className="mt-12 bg-slate-900 p-8 sm:p-12 rounded-[2.5rem] relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
                    <p className="text-xl sm:text-2xl text-white font-bold leading-relaxed text-center italic">
                        "{t('home_section3_quote')}"
                    </p>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-2 pb-10">
                <div className="bg-sky-50 p-8 sm:p-16 rounded-[3rem] text-center border border-sky-100">
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-6">{t('home_section4_title')}</h2>
                    <p className="text-lg text-slate-600 mb-10 max-w-xl mx-auto font-medium">
                        {t('home_section4_p1')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="flex items-center justify-center gap-3 px-10 py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg hover:shadow-xl transition-all">
                            <ShareIcon className="w-5 h-5" />
                            <span>{t('home_box1_title')}</span>
                        </button>
                        <button onClick={() => onNavigate('form')} className="flex items-center justify-center gap-3 px-10 py-5 bg-white text-slate-900 border-2 border-slate-900 rounded-[1.5rem] font-black text-lg hover:bg-slate-50 transition-all">
                            <PlusCircleIcon className="w-5 h-5" />
                            <span>{t('home_box2_title')}</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;
