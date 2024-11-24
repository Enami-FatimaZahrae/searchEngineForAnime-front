import { useState } from "react";
import { Search, Filter } from "lucide-react";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilterOptions, setShowFilterOptions] = useState(false); // Toggle filter section visibility

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(`Searching for "${searchQuery}"`);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="max-w-3xl mx-auto">
        {/* Search Form */}
        <form onSubmit={handleSearch} className="relative flex items-center">
          {/* Input field */}
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search anime..."
            className="w-full px-6 py-4 bg-gray-800 text-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-300 pl-14"
          />
          {/* Search Button */}
          <button
            type="submit"
            className="absolute right-14 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-full hover:bg-blue-500 transition-colors"
          >
            <Search className="w-5 h-5" />
          </button>
          {/* Filter Button */}
          <button
            type="button"
            onClick={() => setShowFilterOptions(!showFilterOptions)} // Toggle full filter div
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-gray-700 text-white rounded-full hover:bg-blue-500 transition-colors"
          >
            <Filter className="w-5 h-5" />
          </button>
        </form>

        {/* Full Filter Section */}
        {showFilterOptions && (
  <div
  className="mt-4 bg-gray-900 text-white p-6 rounded-lg shadow-lg z-50 fixed inset-0 m-auto max-w-2xl max-h-[90vh] overflow-y-auto"
>
    {/* Filter Fields */}
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block mb-2 text-sm">Type</label>
        <select className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded">
          <option>All</option>
          <option>TV</option>
          <option>Movie</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm">Status</label>
        <select className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded">
          <option>All</option>
          <option>Ongoing</option>
          <option>Completed</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm">Rated</label>
        <select className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded">
          <option>All</option>
          <option>PG-13</option>
          <option>R</option>
        </select>
      </div>
      <div>
        <label className="block mb-2 text-sm">Language</label>
        <select className="w-full px-4 py-2 bg-gray-800 text-gray-300 rounded">
          <option>All</option>
          <option>Japanese</option>
          <option>English</option>
        </select>
      </div>
    </div>

    {/* Genre Section */}
    <div className="mt-4">
      <h4 className="mb-2 text-sm font-semibold">Genre</h4>
      <div className="flex flex-wrap gap-2">
        {[
          "Action",
          "Adventure",
          "Comedy",
          "Drama",
          "Fantasy",
          "Horror",
          "Mystery",
          "Romance",
          "Sci-Fi",
        ].map((genre) => (
          <span
            key={genre}
            className="px-4 py-2 bg-gray-800 text-gray-300 rounded cursor-pointer hover:bg-gray-700"
          >
            {genre}
          </span>
        ))}
      </div>
    </div>

    {/* Action Buttons */}
    <div className="mt-6 flex justify-end gap-4">
      <button
        onClick={() => setShowFilterOptions(false)} // Close filter section
        className="px-6 py-2 bg-gray-700 text-gray-300 rounded hover:bg-gray-600"
      >
        Cancel
      </button>
      <button className="px-6 py-2 bg-yellow-500 text-gray-900 rounded hover:bg-yellow-400">
        Filter
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default SearchBar;
