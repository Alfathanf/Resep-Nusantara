// src/main.jsx
import { StrictMode, useState } from 'react'
import { createRoot } from 'react-dom/client'
import SplashScreen from './pages/SplashScreen';
import HomePage from './pages/HomePage';
import MakananPage from './pages/MakananPage';
import MinumanPage from './pages/MinumanPage';
import FavoritPage from './pages/FavoritPage';
import ProfilePage from './pages/ProfilePage';
import RecipeDetailPage from './pages/RecipeDetailPage';
import DesktopNavbar from './components/navbar/DesktopNavbar';
import MobileNavbar from './components/navbar/MobileNavbar';
import './index.css'
import PWABadge from './PWABadge';

function AppRoot() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [previousPage, setPreviousPage] = useState('home'); 

  const handleSplashComplete = () => setShowSplash(false);

  const handleNavigation = (page) => {
    setSelectedRecipe(null);
    setCurrentPage(page);
  };

  const handleRecipeClick = (recipe) => {
    setPreviousPage(currentPage);
    setSelectedRecipe(recipe);
    setCurrentPage('recipe-detail');
  };

  const renderCurrentPage = () => {
    if (selectedRecipe && currentPage === 'recipe-detail') {
      return (
        <RecipeDetailPage 
          recipe={selectedRecipe} 
          onBack={() => {
            setSelectedRecipe(null);
            setCurrentPage(previousPage);
          }} 
        />
      );
    }

    switch (currentPage) {
      case 'home':
        return <HomePage onRecipeClick={handleRecipeClick} />;
      case 'makanan':
        return <MakananPage onRecipeClick={handleRecipeClick} />;
      case 'minuman':
        return <MinumanPage onRecipeClick={handleRecipeClick} />;
      case 'favorit': 
        return <FavoritPage />; 
      case 'profile':
        return <ProfilePage />;
      default:
        return <HomePage onRecipeClick={handleRecipeClick} />;
    }
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Desktop Navbar */}
      <DesktopNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      {/* Konten Utama */}
      <main className="min-h-screen">
        {renderCurrentPage()}
      </main>

      {/* Mobile Navbar */}
      <MobileNavbar currentPage={currentPage} onNavigate={handleNavigation} />

      <PWABadge />
    </div>
  );
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppRoot />
  </StrictMode>,
);