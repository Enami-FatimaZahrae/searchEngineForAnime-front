import { useState } from "react";
import welcomImage from "../assets/ktyCLFc.gif";
import SavedAnimes from "../components/SavedAnimes";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    bio: "Anime enthusiast and full-stack developer.",
  }); 

  const [savedAnimes] = useState([
    {
      id: 1,
      title: "Attack on Titan",
      score: 9.0,
      description:
        "Humans face off against terrifying giants in a post-apocalyptic world.",
    },
    {
      id: 2,
      title: "Demon Slayer",
      score: 8.8,
      description:
        "A young boy becomes a demon slayer to avenge his family and save his sister.",
    },
    {
      id: 3,
      title: "My Hero Academia",
      score: 8.5,
      description:
        "In a world of superpowers, a young boy aspires to become a hero.",
    },
  ]);



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
