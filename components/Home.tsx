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

const InfoCard: React.FC<{ icon: React.ReactNode; title: string; text: string; }> = ({ icon, title, text }) => (
    <div className="bg-slate-50 p-6 rounded-lg border border-slate-200 flex items-start gap-4 hover:border-sky-300 hover:bg-white transition-colors duration-300">
        <div className="bg-sky-100 text-sky-600 p-3 rounded-full flex-shrink-0 mt-1">
            {icon}
        </div>
        <div>
            <h4 className="font-bold text-slate-800">{title}</h4>
            <p className="text-slate-600 text-sm mt-1">{text}</p>
        </div>
    </div>
);

const Home: React.FC = () => {
    const { t } = useLanguage();

    const missionCards = [
        { icon: <BookOpenIcon />, title: t('home_section2_li1_title'), text: t('home_section2_li1_text') },
        { icon: <BridgeIcon />, title: t('home_section2_li2_title'), text: t('home_section2_li2_text') },
        { icon: <UserHeartIcon />, title: t('home_section2_li3_title'), text: t('home_section2_li3_text') },
        { icon: <UsersIcon />, title: t('home_section2_li4_title'), text: t('home_section2_li4_text') },
    ];

    const focusCards = [
        { icon: <ShieldCheckIcon />, title: t('home_section3_li1_title'), text: t('home_section3_li1_text') },
        { icon: <SunIcon />, title: t('home_section3_li2_title'), text: t('home_section3_li2_text') },
        { icon: <HeartBrokenIcon />, title: t('home_section3_li3_title'), text: t('home_section3_li3_text') },
        { icon: <BrainIcon />, title: t('home_section3_li4_title'), text: t('home_section3_li4_text') },
    ];

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-xl shadow-sm border border-slate-200">
            <header className="text-center mb-12 border-b border-slate-200 pb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-3">
                    {t('home_title')}
                </h1>
                <p className="text-lg text-slate-600 max-w-3xl mx-auto">
                    {t('home_subtitle')}
                </p>
            </header>

            <main className="space-y-16 text-slate-800">
                <section>
                    <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold mb-6 text-slate-900">
                        <SparklesIcon />
                        <span>{t('home_section1_title')}</span>
                    </h2>
                    <div className="space-y-4 text-base sm:text-lg leading-relaxed text-slate-700">
                        <p>{t('home_section1_p1')}</p>
                        <p>{t('home_section1_p2')}</p>
                        <p>{t('home_section1_p3')}</p>
                    </div>
                </section>

                <section>
                    <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold mb-6 text-slate-900">
                        <SparklesIcon />
                        <span>{t('home_section2_title')}</span>
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-4">{t('home_section2_p1')}</p>
                    <p className="text-base sm:text-lg leading-relaxed mb-8">{t('home_section2_p2')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {missionCards.map(card => <InfoCard key={card.title} {...card} />)}
                    </div>
                </section>

                <section>
                    <h2 className="flex items-center gap-3 text-2xl sm:text-3xl font-bold mb-6 text-slate-900">
                        <SparklesIcon />
                        <span>{t('home_section3_title')}</span>
                    </h2>
                    <p className="text-base sm:text-lg leading-relaxed mb-4">{t('home_section3_p1')}</p>
                    <p className="text-base sm:text-lg leading-relaxed mb-8">{t('home_section3_p2')}</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {focusCards.map(card => <InfoCard key={card.title} {...card} />)}
                    </div>
                    <p className="text-base sm:text-lg leading-relaxed mt-8 bg-slate-100 p-4 rounded-lg border-s-4 border-sky-400">
                        {t('home_section3_quote')}
                    </p>
                </section>

                <section className="text-center pt-8 mt-12 border-t border-slate-200">
                    <h2 className="text-2xl sm:text-3xl font-bold mb-4">{t('home_section4_title')}</h2>
                    <p className="text-lg text-slate-600 mb-8 max-w-xl mx-auto">
                        {t('home_section4_p1')}
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-6">
                        <div className="bg-sky-50 p-6 rounded-lg flex-1 text-center border-t-4 border-sky-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <ShareIcon className="mx-auto h-8 w-8 text-sky-600 mb-3" />
                            <h3 className="font-semibold text-sky-800 text-lg">{t('home_box1_title')}</h3>
                            <p className="text-sky-700 text-sm mt-1">{t('home_box1_p')}</p>
                        </div>
                        <div className="bg-emerald-50 p-6 rounded-lg flex-1 text-center border-t-4 border-emerald-300 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                            <PlusCircleIcon className="mx-auto h-8 w-8 text-emerald-600 mb-3" />
                            <h3 className="font-semibold text-emerald-800 text-lg">{t('home_box2_title')}</h3>
                            <p className="text-emerald-700 text-sm mt-1">{t('home_box2_p')}</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default Home;
