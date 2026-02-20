import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import './App.css'

// Root layout component
// Manages global state and provides context to child routes

function App() {

  // Search term state (lifted to allow shared access)
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize favorites from localStorage (lazy initialization)
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist favorites to localStorage when updated
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Add book to favorites (avoid duplicates)
  function addToFavorites(book) {
    const exists = favorites.find((item) => item.id === book.id);
    if (exists) return;

    setFavorites([...favorites, book]);
  }

  // Remove book from favorites
  function removeFromFavorites(id) {
    setFavorites(favorites.filter(book => book.id !== id));
  }

  // Handle search input from Header
  function handleSearch(term) {
    setSearchTerm(term);
  }
  

  return (
    <div className='app'>
      <Header onSearch={handleSearch} />
      <main className='main'>
      {/* Provide shared state to all child routes(avoid props drilling) */}
        <Outlet context={{ searchTerm, favorites, addToFavorites, removeFromFavorites }} />
      </main>
    </div>
  );
}

export default App;
