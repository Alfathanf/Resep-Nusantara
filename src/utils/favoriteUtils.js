const FOOD_KEY = 'favoriteFoods';
const DRINK_KEY = 'favoriteDrinks';

function getFavorites(type) {
  const key = type === 'drink' ? DRINK_KEY : FOOD_KEY;
  const stored = localStorage.getItem(key);
  return stored ? JSON.parse(stored) : [];
}

export function addFavorite(recipe, type = 'food') {
  const key = type === 'drink' ? DRINK_KEY : FOOD_KEY;
  const current = getFavorites(type);
  if (!current.find((r) => r.id === recipe.id)) {
    current.push(recipe);
    localStorage.setItem(key, JSON.stringify(current));
  }
}

export function removeFavorite(id, type = 'food') {
  const key = type === 'drink' ? DRINK_KEY : FOOD_KEY;
  const current = getFavorites(type).filter((r) => r.id !== id);
  localStorage.setItem(key, JSON.stringify(current));
}

export function isFavorite(id, type = 'food') {
  return getFavorites(type).some((r) => r.id === id);
}

export function getAllFavorites(type = 'food') {
  return getFavorites(type);
}