import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

// BookCard renders a single book preview
// Reusable presentational component


function BookCard({ book, onRemove }) {

  // Extract image and author safely
  const image = book.formats["image/jpeg"];
  const author = book.authors[0]?.name || "Unknown author";

  return (

    <div className={styles.card}>

      {/* Navigate to book details page */}
      <Link to={`/book/${book.id}`}>
        {image && <img src={image} alt={book.title} className={styles.image} />}
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{author}</p>
      </Link>

      {/* Optional remove button (used in Favorites page) */}
      {onRemove && (
        <button className={styles.remove} onClick={() => onRemove(book.id)}>
          Remove
        </button>
      )}
    </div>
  );
}

export default BookCard;
