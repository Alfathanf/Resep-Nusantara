// src/components/makanan/RecipeGrid.jsx
import { Clock, ChefHat, Heart } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { addFavorite, removeFavorite, isFavorite } from '../../utils/favoriteUtils';

export default function RecipeGrid({ recipes, onRecipeClick }) {
  const [visibleCards, setVisibleCards] = useState(new Set());
  const cardRefs = useRef([]);

  // state favorit
  const [favorites, setFavorites] = useState({});

  useEffect(() => {
    const favMap = {};
    recipes.forEach((recipe) => {
      favMap[recipe.id] = isFavorite(recipe.id, 'food');
    });
    setFavorites(favMap);
  }, [recipes]);

  const toggleFavorite = (recipe) => {
    setFavorites((prev) => {
      const newFavs = { ...prev };
      if (newFavs[recipe.id]) {
        removeFavorite(recipe.id, 'food');
        newFavs[recipe.id] = false;
      } else {
        addFavorite(recipe, 'food');
        newFavs[recipe.id] = true;
      }
      return newFavs;
    });
  };

  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, recipes.length);
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.dataset.index);
          setTimeout(() => {
            setVisibleCards(prev => new Set(prev).add(index));
          }, (index % 3) * 150);
        }
      });
    }, { threshold: 0.1 });

    cardRefs.current.forEach((ref, index) => {
      if (ref) {
        ref.dataset.index = index;
        observer.observe(ref);
      }
    });

    return () => observer.disconnect();
  }, [recipes]);

  return (
    <section>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
        {recipes.map((recipe, index) => (
          <div 
            key={recipe.id}
            ref={el => cardRefs.current[index] = el}
            onClick={() => onRecipeClick(recipe)} 
            className={`group transform transition-all duration-700 cursor-pointer ${
              visibleCards.has(index) 
                ? 'translate-y-0 opacity-100' 
                : 'translate-y-8 opacity-0'
            }`}
          >
            <div className="relative bg-white/15 backdrop-blur-xl border border-white/25 rounded-2xl overflow-hidden shadow-lg hover:shadow-blue-500/20 transition-all duration-500 group-hover:scale-105">
              <div className="relative h-40 md:h-56 overflow-hidden">
                <img 
                  src={recipe.image_url}
                  alt={recipe.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation(); 
                  toggleFavorite(recipe);
                }}
                className="absolute top-2 right-2 z-20 bg-white/80 rounded-full p-1.5 hover:bg-white transition"
              >
                <Heart
                  size={18}
                  className={
                    favorites[recipe.id]
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-500'
                  }
                />
              </button>

              
              <div className="p-4 md:p-6">
                <h3 className="font-bold text-slate-800 mb-3 text-base md:text-xl group-hover:text-blue-600 transition-colors duration-200 line-clamp-2">
                  {recipe.name}
                </h3>
                <div className="flex items-center justify-between text-xs md:text-sm text-slate-600">
                  <div className="flex items-center space-x-2 bg-white/70 px-3 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    <span>{recipe.ingredients.length} bahan</span>
                  </div>
                  <div className="flex items-center space-x-2 bg-white/70 px-3 py-1 rounded-full">
                    <ChefHat className="w-4 h-4" />
                    <span>{recipe.steps.length} langkah</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {recipes.length === 0 && (
        <div className="text-center py-16">
          <p className="text-slate-500">Resep tidak ditemukan. Coba kata kunci lain.</p>
        </div>
      )}
    </section>
  );
}
