import { Link } from "react-router-dom";
import styles from "./BookCard.module.css";

function BookCard({ book, onRemove }) {
  const image = book.formats["image/jpeg"];
  const author = book.authors[0]?.name || "Unknown author";

  return (
    // <div className={styles.card}>
    //     <Link to={`/book/${book.id}`} >
    //         {image && (
    //             <img
    //                 src={image}
    //                 alt={book.title}
    //                 width="120"
    //                 className={styles.image}
    //             />
    //         )}
    //         <h3 className={styles.title}>{book.title}</h3>
    //         <p className={styles.author}>{author}</p>
    //     </Link>
    // </div>
    <div className={styles.card}>
      <Link to={`/book/${book.id}`}>
        {image && <img src={image} alt={book.title} className={styles.image} />}
        <h3 className={styles.title}>{book.title}</h3>
        <p className={styles.author}>{author}</p>
      </Link>

      {onRemove && (
        <button className={styles.remove} onClick={() => onRemove(book.id)}>
          Remove
        </button>
      )}
    </div>
  );
}

export default BookCard;
