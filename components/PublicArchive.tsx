
import React, { useState, useMemo } from 'react';
import type { Testimony } from '../types';
import { StoryCard } from './StoryCard';
import { ArchiveTable } from './ArchiveTable';
import { useLanguage } from '../contexts/LanguageContext';
import { SearchIcon } from './icons/SearchIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { GridIcon } from './icons/GridIcon';
import { TableIcon } from './icons/TableIcon';

interface PublicArchiveProps {
  testimonies: Testimony[];
}

const PublicArchive: React.FC<PublicArchiveProps> = ({ testimonies }) => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  const uniqueLocations = useMemo(() => {
    const locations = new Set(testimonies.map(t => t.location));
    return [t('allLocations'), ...Array.from(locations)];
  }, [testimonies, t]);

  const filteredTestimonies = useMemo(() => {
    return testimonies.filter(testimony => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        testimony.title.toLowerCase().includes(searchLower) ||
        testimony.event.toLowerCase().includes(searchLower) ||
        testimony.writtenText.toLowerCase().includes(searchLower);

      const matchesLocation =
        locationFilter === t('allLocations') || locationFilter === '' || testimony.location === locationFilter;

      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, locationFilter, testimonies, t]);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">{t('archiveTitle')}</h2>
        <p className="text-slate-600 max-w-2xl mx-auto text-lg">{t('archiveSubtitle')}</p>
      </div>

      <div className="max-w-5xl mx-auto mb-10 flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-grow w-full bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-3">
              <div className="flex-grow relative">
                  <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
                      <SearchIcon />
                  </div>
                  <input
                      type="search"
                      placeholder={t('searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full ps-11 pe-4 py-3 border-none rounded-xl focus:ring-0 outline-none text-slate-700 bg-slate-50/50"
                  />
              </div>
              <div className="md:w-64 relative">
                  <div className="absolute inset-y-0 start-0 ps-4 flex items-center pointer-events-none">
                      <MapPinIcon />
                  </div>
                  <select
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full ps-11 pe-4 py-3 border-none rounded-xl focus:ring-0 outline-none text-slate-700 bg-slate-50/50 appearance-none"
                  >
                      {uniqueLocations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                      ))}
                  </select>
              </div>
          </div>

          <div className="flex bg-white p-1.5 rounded-2xl shadow-sm border border-slate-200">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'grid' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                  <GridIcon />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2.5 rounded-xl transition-all ${viewMode === 'table' ? 'bg-slate-900 text-white shadow-md' : 'text-slate-400 hover:text-slate-600'}`}
              >
                  <TableIcon />
              </button>
          </div>
      </div>
      
      {filteredTestimonies.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredTestimonies.map(testimony => (
              <StoryCard key={testimony.id} testimony={testimony} />
            ))}
          </div>
        ) : (
          <ArchiveTable testimonies={filteredTestimonies} />
        )
      ) : (
        <div className="text-center py-24 bg-white rounded-3xl border-2 border-dashed border-slate-200">
            <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <SearchIcon />
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{t('noStoriesFound')}</h3>
            <p className="text-slate-500 mt-2">Try adjusting your search or filters.</p>
        </div>
      )}
    </div>
  );
};

export default PublicArchive;
