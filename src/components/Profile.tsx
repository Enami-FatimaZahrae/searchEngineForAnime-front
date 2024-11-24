import { useState } from "react";
import welcomImage from "../assets/ktyCLFc.gif";

const Profile = () => {
  const [userInfo, setUserInfo] = useState({
    username: "JohnDoe",
    email: "johndoe@example.com",
    bio: "Anime enthusiast and full-stack developer.",
  });

//   const [isEditing, setIsEditing] = useState(false);
  const [savedFiles, setSavedFiles] = useState([
    { id: 1, name: "My Favorite Anime List", type: "text" },
    { id: 2, name: "Episode Tracker", type: "spreadsheet" },
    { id: 3, name: "Anime Fan Art", type: "image" },
  ]);

//   const handleEditInfo = () => setIsEditing(!isEditing);

//   const handleSaveInfo = (updatedInfo: typeof userInfo) => {
//     setUserInfo(updatedInfo);
//     setIsEditing(false);
//   };

  const handleDeleteFile = (id: number) => {
    setSavedFiles((prevFiles) => prevFiles.filter((file) => file.id !== id));
  };

  return (
    <div className="min-h-screen  p-6">
      {/* Banner Section */}
      <header className="relative bg-gray-100">
        <img
          src={welcomImage}
          alt="Anime Banner"
          className="w-full h-64 object-cover rounded-lg shadow-lg"
        />
      </header>

      {/* Welcome Message Section */}
      <section className="bg-white p-6 -mt-2 -pt-2 shadow-md mb-8 text-center">
        <h1 className="text-4xl font-bold text-gray-800 md:text-5xl lg:text-6xl drop-shadow-lg">
          Welcome, {userInfo.username}!
        </h1>
        <p className="text-lg mt-2 text-gray-700 md:text-xl lg:text-2xl drop-shadow-lg">
          Your anime journey starts here!
        </p>
      </section>

      {/* Saved Files Section */}
     
    </div>
  );
};

export default Profile;
