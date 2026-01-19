
import type { Testimony } from './types';

export const MOCK_TESTIMONIES: Testimony[] = [
  {
    id: 1,
    title: "The Morning of the Siege",
    event: "Battle of Omdurman",
    date: "2024-04-15",
    location: "Omdurman, Khartoum",
    writtenText: "The day started like any other, but the sound of distant gunfire quickly grew closer. We hid in our basement for three days, listening to the city crumble around us.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    imageUrl: "https://placehold.co/600x400/a3e6f6/334155?text=Omdurman+Siege",
    status: 'approved',
    author: 'Anonymous'
  },
  {
    id: 2,
    title: "My Journey from Khartoum",
    event: "The 2024 Evacuation",
    date: "2024-05-02",
    location: "Khartoum",
    writtenText: "Leaving my home was the hardest decision of my life. I packed a single bag, not knowing if I would ever return.",
    status: 'approved',
    author: 'Ahmed S.'
  },
  {
    id: 3,
    title: "Life under siege in El Fasher",
    event: "Siege of El Fasher",
    date: "2024-06-10",
    location: "El Fasher, North Darfur",
    writtenText: "For weeks, we were cut off from the world. Food and water became scarce. Every day was a struggle for survival.",
    audioUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
    imageUrl: "https://placehold.co/600x400/fecaca/334155?text=El+Fasher+Life",
    status: 'pending',
    author: 'Anonymous'
  },
  {
    id: 4,
    title: "A Glimmer of Hope",
    event: "Humanitarian Aid Arrival",
    date: "2024-07-21",
    location: "Port Sudan",
    writtenText: "After months of hardship, the first aid convoy arrived. Seeing the trucks roll in felt like a miracle.",
    status: 'approved',
    author: 'Mona K.'
  }
];
