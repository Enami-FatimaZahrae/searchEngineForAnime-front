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
    const fetchSavedAnimes = async () => {
      if (parsedUserId === null) {
        console.error("User ID is not available in localStorage.");
        return;
      }

      try {
        const animes = await userService.getAnimesByUserId(parsedUserId);
        setSavedAnimes(animes); // Update the savedAnimes state with the fetched animes
      } catch (err) {
        console.error("Failed to fetch animes:", err);
      }
    };

    fetchSavedAnimes();
  }, [parsedUserId]);



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
     
    </div>
  );
};

export default Profile;
