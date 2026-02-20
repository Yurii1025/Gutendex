import styles from "./BookList.module.css";
import BookCard from "./BookCard";

// BookList is a reusable container component
// Responsible only for layout and mapping books to BookCard components


function BookList({ books, onRemove }) {
    return (
        <div className={styles.grid}>
        {/* Render each book using BookCard */}
            {books.map(book => (
                <BookCard 
                    key={book.id} // Unique key for React reconciliation
                    book={book} 
                    onRemove={onRemove} 

                    />
            ))}
        </div>
    );
}

export default BookList;