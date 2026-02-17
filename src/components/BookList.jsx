import styles from "./BookList.module.css";
import BookCard from "./BookCard";

function BookList({ books, onRemove }) {
    return (
        <div className={styles.grid}>
            {books.map(book => (
                <BookCard key={book.id} book={book} onRemove={onRemove} />
            ))}
        </div>
    );
}

export default BookList;