import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark } from "@fortawesome/free-solid-svg-icons";
import PdfViewer from "./PdfViewer";

interface Anime {
  id: number;
  title: string;
  score: number;
  shortDescription: string;
  doc_name: string;
}

interface SavedAnimesProps {
  animes: Anime[];
}

const SavedAnimes: React.FC<SavedAnimesProps> = ({ animes }) => {
  const [selectedPdf, setSelectedPdf] = useState<string | null>(null);

  const handleViewPdf = (pdfUrl: string) => {
    setSelectedPdf(pdfUrl);
  };

  return (
    <section className="bg-gray-800 p-6 shadow-md mb-8 z-0 rounded-b-lg">
      <h2 className="text-2xl font-semibold mb-4">Saved Animes</h2>
      <ul className="space-y-4">
        {animes.map((anime) => (
          <li
            key={anime.id}
            className="relative border border-gray-700 rounded-lg shadow-lg p-4 hover:bg-gray-700 transition duration-300"
          >
            {/* Save Icon */}
            <div className="absolute top-2 right-2 z-10 p-2 rounded-full">
              <FontAwesomeIcon
                icon={faBookmark}
                className="text-yellow-500 hover:text-gray-500 cursor-pointer"
              />
            </div>
            <h3 className="text-lg font-semibold mb-2">{anime.title}</h3>
            <p className="text-sm text-gray-400 mb-1">Score: {anime.score}</p>
            <p className="text-sm text-gray-300 mb-4">
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
