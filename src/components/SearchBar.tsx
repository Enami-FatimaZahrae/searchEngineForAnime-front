import { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Implement search logic here
    console.log('Searching for:', searchQuery);
  };

  return (
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="relative flex items-center">
            {/* Input field */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search anime..."
              className="w-full px-6 py-4 bg-gray-800 text-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-blue-300 pl-14"
            />
            {/* Search Icon */}
            <Search className="absolute left-5 text-blue-500" />
            {/* Search Button */}
            <button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-blue-500 text-black rounded-full hover:bg-yellow-500 transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
  );
};

export default SearchBar;
