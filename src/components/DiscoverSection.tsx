import React from 'react';
import img1 from '../assets/images/latestReleases.jpg';
import img2 from '../assets/images/seasonalPicks.jpg';
import img3 from '../assets/images/Recommend.jpg';


const DiscoverSection = () => {
  const discoverCards = [
    {
      id: 1,
      title: "Latest Releases",
      description: "Explore the newest anime releases and stay up to date with the latest episodes.",
      image: img1,
      buttonText: "Explore Now"
    },
    {
      id: 2,
      title: "Seasonal Picks",
      description: "Check out this season's most popular and highly-rated anime series.",
      image: img2,
      buttonText: "View Season"
    },
    {
      id: 3,
      title: "Recommendations",
      description: "Get personalized anime recommendations based on your interests.",
      image: img3,
      buttonText: "Get Started"
    }
  ];

  return (
    <section id="discover" className="py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {discoverCards.map(card => (
            <div key={card.id} className="bg-gray-700 rounded-lg overflow-hidden hover:scale-105 transition-transform">
              <img src={card.image} alt={card.title} className="w-full h-96 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-white">{card.title}</h3>
                <p className="text-gray-300">{card.description}</p>
                <button className="mt-4 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors text-white">
                  {card.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoverSection;