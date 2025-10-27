// src/pages/MakananPage.jsx
import { useState, useEffect } from 'react';
import { ResepMakanan } from '../data/makanan';
import RecipeGrid from '../components/makanan/RecipeGrid';

export default function MakananPage({ onRecipeClick }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 3;

  const allMakanan = Object.values(ResepMakanan.resep);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredRecipes(allMakanan);
    } else {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = allMakanan.filter(recipe =>
        recipe.name.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredRecipes(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery]);

  const totalPages = Math.ceil(filteredRecipes.length / recipesPerPage);
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipes = filteredRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage(prev => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage(prev => prev - 1);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 pb-20 md:pb-8">
      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8 md:py-12 space-y-8">

        <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">
          Jelajahi Resep Makanan
        </h1>
        <p className="text-center text-slate-500 max-w-2xl mx-auto mb-8">
          Temukan inspirasi masakan Nusantara favoritmu. Dari hidangan utama hingga camilan, semua ada di sini.
        </p>

        <div className="max-w-3xl mx-auto">
          <input
            type="text"
            placeholder="Cari resep makanan..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-5 py-3 border border-gray-300 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-400 text-gray-700"
          />
        </div>

        <RecipeGrid recipes={currentRecipes} onRecipeClick={onRecipeClick} />

        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`px-4 py-2 rounded-full font-semibold ${
                currentPage === 1
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              Sebelumnya
            </button>
            <span className="text-gray-700 font-medium">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button
              onClick={nextPage}
              disabled={currentPage === totalPages}
              className={`px-4 py-2 rounded-full font-semibold ${
                currentPage === totalPages
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-indigo-500 text-white hover:bg-indigo-600'
              }`}
            >
              Berikutnya
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
