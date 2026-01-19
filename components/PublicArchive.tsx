
import React, { useState, useMemo } from 'react';
import { MOCK_TESTIMONIES } from '../constants';
import { StoryCard } from './StoryCard';
import { ArchiveTable } from './ArchiveTable';
import { useLanguage } from '../contexts/LanguageContext';
import { SearchIcon } from './icons/SearchIcon';
import { MapPinIcon } from './icons/MapPinIcon';
import { GridIcon } from './icons/GridIcon';
import { TableIcon } from './icons/TableIcon';

type ArchiveView = 'grid' | 'table';

const PublicArchive: React.FC = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [viewMode, setViewMode] = useState<ArchiveView>('grid');

  const uniqueLocations = useMemo(() => {
    const locations = new Set(MOCK_TESTIMONIES.map(t => t.location));
    return [t('allLocations'), ...Array.from(locations)];
  }, [t]);

  const filteredTestimonies = useMemo(() => {
    return MOCK_TESTIMONIES.filter(testimony => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        testimony.title.toLowerCase().includes(searchLower) ||
        testimony.event.toLowerCase().includes(searchLower) ||
        testimony.writtenText.toLowerCase().includes(searchLower);

      const matchesLocation =
        locationFilter === t('allLocations') || locationFilter === '' || testimony.location === locationFilter;

      return matchesSearch && matchesLocation;
    });
  }, [searchQuery, locationFilter, t]);

  return (
    <div>
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">{t('archiveTitle')}</h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto">{t('archiveSubtitle')}</p>
      </div>

      <div className="max-w-4xl mx-auto mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-grow p-4 bg-white rounded-xl shadow-sm border border-slate-200 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 relative">
                  <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                      <SearchIcon />
                  </div>
                  <input
                      type="search"
                      id="search"
                      placeholder={t('searchPlaceholder')}
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full ps-10 pe-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500"
                  />
              </div>
              <div className="relative">
                  <div className="absolute inset-y-0 start-0 ps-3 flex items-center pointer-events-none">
                      <MapPinIcon />
                  </div>
                  <select
                      id="location"
                      value={locationFilter}
                      onChange={(e) => setLocationFilter(e.target.value)}
                      className="w-full ps-10 pe-4 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-sky-500 bg-white"
                  >
                      {uniqueLocations.map(loc => (
                          <option key={loc} value={loc}>{loc}</option>
                      ))}
                  </select>
              </div>
          </div>

          <div className="flex bg-white p-1 rounded-xl shadow-sm border border-slate-200 self-center">
              <button 
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'grid' ? 'bg-sky-100 text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
                title={t('gridView')}
              >
                  <GridIcon />
              </button>
              <button 
                onClick={() => setViewMode('table')}
                className={`p-2 rounded-lg transition-colors ${viewMode === 'table' ? 'bg-sky-100 text-sky-600' : 'text-slate-400 hover:text-slate-600'}`}
                title={t('tableView')}
              >
                  <TableIcon />
              </button>
          </div>
      </div>
      
      {filteredTestimonies.length > 0 ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTestimonies.map(testimony => (
              <StoryCard key={testimony.id} testimony={testimony} />
            ))}
          </div>
        ) : (
          <ArchiveTable testimonies={filteredTestimonies} />
        )
      ) : (
        <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-800">{t('noStoriesFound')}</h3>
            <p className="text-slate-500 mt-2">{t('noStoriesSubtitle')}</p>
        </div>
      )}
    </div>
  );
};

export default PublicArchive;
