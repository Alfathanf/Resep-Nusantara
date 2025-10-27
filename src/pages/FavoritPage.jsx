// src/pages/FavoritPage.jsx
import React, { useState, useEffect } from 'react';
import FavoriteRecipeGrid from '../components/favorit/RecipeGrid';
import { getAllFavorites } from '../utils/favoriteUtils';

export default function FavoritPage() {
  const [foods, setFoods] = useState([]);
  const [drinks, setDrinks] = useState([]);

  useEffect(() => {
    setFoods(getAllFavorites('food'));
    setDrinks(getAllFavorites('drink'));
  }, []);

  return (
   <div className="p-6">
      <h1 className="text-3xl md:text-5xl font-bold text-slate-800 text-center mb-4">Favorit</h1>

      <h2 className="text-xl font-semibold mb-2">Makanan Favorit</h2>
      <FavoriteRecipeGrid recipes={foods} type="food" />

      <h2 className="text-xl font-semibold mb-2 mt-10">Minuman Favorit</h2>
      <FavoriteRecipeGrid recipes={drinks} type="drink" />
    </div>
  );
}