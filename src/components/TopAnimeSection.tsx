import React from 'react';
import { Star } from 'lucide-react';
import img1 from '../assets/images/Attack_on_Titan.jpg';
import img2 from '../assets/images/Demon_Slayer.jpg';
import img3 from '../assets/images/My_Hero_Academia.jpg';
import img4 from '../assets/images/Jujutsu_Kaisen.jpg';

const TopAnimeSection = () => {
  const topAnime = [
    { id: 1, title: "Attack on Titan", rating: 9.0, image: img1},
    { id: 2, title: "Demon Slayer", rating: 8.9, image: img2 },
    { id: 3, title: "My Hero Academia", rating: 8.7, image: img3},
    { id: 4, title: "Jujutsu Kaisen", rating: 8.8, image: img4}
  ];

  return (
    <section id="top-anime" className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topAnime.map(anime => (
            <div key={anime.id} className="bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition-transform">
              <img src={anime.image} alt={anime.title} className="w-full h-40 object-cover" />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-white">{anime.title}</h3>
                <div className="flex items-center">
                  <Star className="w-5 h-5 text-yellow-400 mr-1" />
                  <span className="text-white">{anime.rating}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TopAnimeSection;