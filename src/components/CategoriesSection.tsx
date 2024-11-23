import React from 'react';
import { Star, Compass, Grid, TrendingUp } from 'lucide-react';

const CategoriesSection = () => {
  const categories = [
    { id: 1, name: "Action", count: 1250, icon: TrendingUp },
    { id: 2, name: "Adventure", count: 800, icon: Compass },
    { id: 3, name: "Romance", count: 600, icon: Star },
    { id: 4, name: "Comedy", count: 900, icon: Grid },
  ];

  return (
    <section id="categories" className="py-12 ">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map(category => (
            <div key={category.id} className="bg-gray-700 p-6 rounded-lg hover:bg-gray-700 transition-colors cursor-pointer">
              <category.icon className="w-8 h-8 mb-4 text-blue-500" />
              <h3 className="text-xl font-semibold mb-2 text-white">{category.name}</h3>
              <p className="text-gray-400">{category.count}+ titles</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;