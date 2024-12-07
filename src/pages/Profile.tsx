import { useState,useEffect } from "react";
import welcomImage from "../assets/ktyCLFc.gif";
import SavedAnimes from "../components/SavedAnimes";
import { userService } from "../services/userService";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "johndoe@example.com",
    bio: "Anime enthusiast and full-stack developer.",
  }); 

  const [savedAnimes, setSavedAnimes] = useState([]); // Initialize as an empty array
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const pageSize = 10;


  const userId = localStorage.getItem("userId");
  
  const parsedUserId = userId ? parseInt(userId, 10) : null;

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
          username, // Update only the username in the userInfo state
        }));
      } catch (err) {
        console.error("Failed to fetch username:", err);
      }
    };

    fetchUserName();
  }, [parsedUserId]);

  useEffect(() => {
    const fetchAnimes = async () => {
      if (parsedUserId === null) return;

      try {
        const response = await userService.getPaginatedAnimes(parsedUserId, currentPage, pageSize);
        setSavedAnimes(response.content);
        setTotalPages(response.totalPages);
      } catch (err) {
        console.error("Failed to fetch animes:", err);
      }
    };

    fetchAnimes();
  }, [parsedUserId, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };



  return (
    <div className="min-h-screen  p-6">
      {/* Banner Section */}
      <header className="relative bg-gray-100 mt-14 rounded-t-lg	">
        <img
          src={welcomImage}
          alt="Anime Banner"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      {/* Welcome Message Section */}
      <section className="bg-white p-6 -mt-2 -pt-2 shadow-md -mb-1 text-center z-10">
        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl drop-shadow-lg">
          Welcome, {userInfo.username}!
        </h1>
        <p className="text-lg mt-2 text-gray-700 md:text-xl lg:text-2xl drop-shadow-lg">
          Your anime journey starts here!
        </p>
      </section>

      {/* Saved Files Section */}
      <SavedAnimes animes={savedAnimes} />

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
          onClick={() => currentPage < totalPages - 1 && handlePageChange(currentPage + 1)}
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
