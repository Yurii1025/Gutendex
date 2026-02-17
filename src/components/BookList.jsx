import styles from "./BookList.module.css";
import BookCard from "./BookCard";

function BookList({ books }) {
    return (
        <div className={styles.grid}>
            {books.map(book => (
                <BookCard key={book.id} book={book} />
            ))}
        </div>
    );
}

export default BookList;