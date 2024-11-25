import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";

interface Anime {
  id: number;
  title: string;
  image: string;
  score: number;
  description: string;
}

interface SavedAnimesProps {
  animes: Anime[];
}

const SavedAnimes: React.FC<SavedAnimesProps> = ({ animes }) => {
  return (
    <section className="bg-gray-800 p-6  shadow-md mb-8 z-0 rounded-b-lg">
      <h2 className="text-2xl font-semibold mb-4">Saved Animes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {animes.map((anime) => (
          <div
            key={anime.id}
            className="relative group border border-gray-700 rounded-lg shadow-lg overflow-hidden"
          >
            {/* Save Icon */}
            <div className="absolute top-2 right-2 z-10  p-2 rounded-full">
            <FontAwesomeIcon
              icon={faBookmark}
              className="text-yellow-500 hover:text-gray-500 cursor-pointer"
              size="2x" // Increase size here (e.g., "lg", "2x", "3x")
            />
           </div>
            <img
              src={anime.image}
              alt={anime.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{anime.title}</h3>
              <p className="text-sm text-gray-500">Score: {anime.score}</p>
            </div>
            {/* Hover effect for description */}
            <div className="absolute inset-0 bg-black bg-opacity-75 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="p-4 text-center">{anime.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SavedAnimes;
