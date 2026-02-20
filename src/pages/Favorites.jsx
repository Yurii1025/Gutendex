import BookList from "../components/BookList";
import styles from "./Favorites.module.css";
import { useOutletContext } from "react-router-dom";

// Favorites page renders books saved in global state
// Retrieves data and actions from App via Outlet context

function Favorites() {

  // Access favorites state and remove function
  const { favorites, removeFromFavorites } = useOutletContext();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Your Favorites</h1>

      {/* Show empty state if no favorites */}
      {favorites.length === 0 ? (
        <p className={styles.empty}>
          You haven't added any books yet.
        </p>
      ) : (
        // Reuse BookList component for consistent layout
        <BookList
          books={favorites}
          onRemove={removeFromFavorites}
        />
      )}
    </div>
  );
}

export default Favorites;