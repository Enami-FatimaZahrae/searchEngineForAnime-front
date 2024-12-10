import { useState, useEffect } from "react";
import welcomImage from "../assets/ktyCLFc.gif";
import SavedAnimes from "../components/SavedAnimes";
import { userService } from "../services/userService";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "johndoe@example.com",
    bio: "Anime enthusiast and full-stack developer.",
  });

  type Anime = {
    id: number;
    title: string;
    score: number;
    shortDescription: string;
    doc_name: string;
  };

  const [savedAnimes, setSavedAnimes] = useState<Anime[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;

  const userId = localStorage.getItem("userId");
  const parsedUserId = userId ? parseInt(userId, 10) : null;

  // Fetch user information
  useEffect(() => {
    const fetchUserName = async () => {
      if (parsedUserId === null) {
        console.error("User ID is not available in localStorage.");
        return;
      }

      try {
        const username = await userService.getNameById(parsedUserId);
        setUserInfo((prevInfo) => ({
          ...prevInfo,
          username,
        }));
      } catch (err) {
        console.error("Failed to fetch username:", err);
      }
    };

    fetchUserName();
  }, [parsedUserId]);

  // Function to load saved animes
  const loadSavedAnimes = async () => {
    if (parsedUserId === null) {
      console.error("User ID is not available.");
      return;
    }

    try {
      const response = await userService.getPaginatedAnimes(
        parsedUserId,
        currentPage,
        pageSize
      );
      setSavedAnimes(response.content);
      setTotalPages(response.totalPages);
    } catch (err) {
      console.error("Failed to fetch animes:", err);
    }
  };

  // Fetch saved animes when page changes
  useEffect(() => {
    loadSavedAnimes();
  }, [currentPage]);

  // Handle page change for pagination
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle unsave anime
  const handleAnimeUnsave = (animeId: number) => {
    const updatedAnimes = savedAnimes.filter((anime) => anime.id !== animeId);
    setSavedAnimes(updatedAnimes); // Update the state to remove the anime from the list

    // If the current page has no items, check if there are previous pages available
    if (updatedAnimes.length === 0 && currentPage > 0) {
      setCurrentPage(currentPage - 1); // Move to the previous page if necessary
    }

    // Optionally, make the API call to remove the anime from the backend
    if (parsedUserId !== null) {
      userService.removeAnimeFromUser(parsedUserId, animeId)
        .catch((err) => console.error("Failed to unsave anime:", err));
    }
  };

  return (
    <div className="min-h-screen p-6">
      <header className="relative bg-gray-100 mt-14 rounded-t-lg">
        <img
          src={welcomImage}
          alt="Anime Banner"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      <section className="bg-white p-6 -mt-2 -pt-2 shadow-md -mb-1 text-center z-10">
        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl drop-shadow-lg">
          Welcome, {userInfo.username}!
        </h1>
        <p className="text-lg mt-2 text-gray-700 md:text-xl lg:text-2xl drop-shadow-lg">
          Your anime journey starts here!
        </p>
      </section>

      <SavedAnimes
        animes={savedAnimes}
        userId={parsedUserId ?? 0}
        onAnimeUnsave={handleAnimeUnsave}
      />

      <div className="flex justify-center mt-8 space-x-2">
        <button
          onClick={() => currentPage > 0 && handlePageChange(currentPage - 1)}
          className={`px-4 py-2 rounded-md border shadow-sm text-sm font-medium ${
            currentPage > 0
              ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={currentPage === 0}
        >
          Previous
        </button>

        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index)}
            className={`px-3 py-2 rounded-md text-sm font-medium shadow-sm transition-all ${
              currentPage === index
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-gray-700 border border-gray-300 hover:bg-blue-50"
            }`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() =>
            currentPage < totalPages - 1 && handlePageChange(currentPage + 1)
          }
          className={`px-4 py-2 rounded-md border shadow-sm text-sm font-medium ${
            currentPage < totalPages - 1
              ? "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
          disabled={currentPage === totalPages - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Profile;