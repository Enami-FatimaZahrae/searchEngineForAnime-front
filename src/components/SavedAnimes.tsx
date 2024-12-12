import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import PdfViewer from "./PdfViewer";
import { userService } from "../services/userService"; // Adjust the path as needed

interface Anime {
  id: number;
  title: string;
  score: number;
  shortDescription: string;
  doc_name: string;
}

interface SavedAnimesProps {
  animes: Anime[];
  userId: number; // Assuming you have the userId available in props
  onAnimeUnsave: (animeId: number) => void; // Callback to update the parent state
}

const SavedAnimes: React.FC<SavedAnimesProps> = ({ animes, userId, onAnimeUnsave }) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);
  const [loadingAnimeId, setLoadingAnimeId] = useState<number | null>(null); // Track loading state per anime

  const handleViewPdf = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };


  const handleUnsaveAnime = async (animeId: number) => {
    setLoadingAnimeId(animeId); // Set loading state for the specific anime
    try {
      await userService.removeAnimeFromUser(userId, animeId);
      onAnimeUnsave(animeId); // Notify parent to update the list
      // alert("Anime removed successfully!"); // Optional feedback
    } catch (error) {
      console.error("Failed to remove anime:", error);
      // alert("Failed to remove anime.");
    } finally {
      setLoadingAnimeId(null); // Clear loading state
    }
  };

  return (
    <section className=" p-6 shadow-md mb-8 z-0 rounded-b-lg">
      <h2 className="text-2xl font-semibold mb-4">Saved Animes</h2>
      <ul className="space-y-4">
        {animes.map((anime) => (
          <li
            key={anime.id}
            className="relative border border-gray-700 rounded-lg bg-gray-900 cursor-pointer shadow-lg p-4 hover:bg-gray-800 transition duration-300"
          >
            {/* Save Icon */}
            <div className="absolute top-2 right-2 z-10 p-2 rounded-full">
              <FontAwesomeIcon
                icon={faBookmark}
                className={`text-yellow-500 hover:text-gray-500 cursor-pointer ${
                  loadingAnimeId === anime.id ? "animate-pulse" : ""
                }`}
                onClick={() => handleUnsaveAnime(anime.id)}
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{anime.title}</h3>
            <p className="text-sm text-gray-400 mb-1">Score: {anime.score}</p>
            <p className="text-sm text-gray-300 mb-4 line-clamp-2 ">
              {anime.shortDescription}
            </p>
            <button
              onClick={() => handleViewPdf(`http://localhost:5173/animes/${anime.doc_name}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              View PDF
            </button>
          </li>
        ))}
      </ul>

      {/* PDF Viewer Modal */}
      {selectedPdf && (
        <PdfViewer
          pdfUrl={selectedPdf}
          onClose={() => setSelectedPdf(null)}
        />
      )}
    </section>
  );
};

export default SavedAnimes;
