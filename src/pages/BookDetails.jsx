import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import styles from "./BookDetails.module.css";
import Loader from "../components/Loader";

// BookDetails renders a single book page
// Uses dynamic route parameter (:id)

function BookDetails() {
  // Extract book ID from URL
  const { id } = useParams();

   // Access global favorites state and functions
  const { addToFavorites, removeFromFavorites, favorites } = useOutletContext();

  // Local state for book data and async control
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch book when ID changes
  useEffect(() => {
    setLoading(true);
    setError(null);

    fetch(`https://gutendex.com/books/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setBook(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrond");
        setLoading(false);
      });
  }, [id]);


  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!book) return null;

  // Determine if book is already in favorites
  const isFavorite = favorites.some((item) => item.id === book.id);

  return (
    <div className={styles.wrapper}>
      {book.formats?.["image/jpeg"] && (
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className={styles.image}
        />
      )}

      <div className={styles.content}>
        <h1 className={styles.title}>{book.title}</h1>

        <p className={styles.meta}>
          Author: {book.authors?.[0]?.name || "Unknown"}
        </p>

        <p className={styles.meta}>Downloads: {book.download_count}</p>

        <p className={styles.meta}>Language: {book.languages?.join(", ")}</p>


        {isFavorite ? (
          <button
            className={styles.button}
            onClick={() => removeFromFavorites(book.id)}
          >
            Remove from Favorites
          </button>
        ) : (
          <button
            className={styles.button}
            onClick={() => addToFavorites(book)}
          >
            Add to Favorites
          </button>
        )}

        {book.formats["text/html"] && (
          <a
            href={book.formats["text/html"]}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            Read Online
          </a>
        )}
      </div>
    </div>
  );
}

export default BookDetails;
