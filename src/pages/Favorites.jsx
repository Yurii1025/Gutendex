import BookList from "../components/BookList";
import styles from "./Favorites.module.css";
import { useOutletContext } from "react-router-dom";

function Favorites() {
  const { favorites, removeFromFavorites } = useOutletContext();

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Your Favorites</h1>

      {favorites.length === 0 ? (
        <p className={styles.empty}>
          You haven't added any books yet.
        </p>
      ) : (
        <BookList
          books={favorites}
          onRemove={removeFromFavorites}
        />
      )}
    </div>
  );
}

export default Favorites;