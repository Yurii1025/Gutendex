import { Outlet } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from "./components/Header";
import './App.css'

function App() {

  const [searchTerm, setSearchTerm] = useState("");

  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function addToFavorites(book) {
    const exists = favorites.find((item) => item.id === book.id);
    if (exists) return;

    setFavorites([...favorites, book]);
  }

  function removeFromFavorites(id) {
    setFavorites(favorites.filter(book => book.id !== id));
  }

  function handleSearch(term) {
    setSearchTerm(term);
  }
  

  return (
    <>
      <Header onSearch={handleSearch} />
      <Outlet context={{ searchTerm, favorites, addToFavorites, removeFromFavorites }} />
    </>
  );
}

export default App;
