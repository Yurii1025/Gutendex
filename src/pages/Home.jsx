import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BookList from "../components/BookList";
import Loader from "../components/Loader";
import styles from "./Home.module.css";

// Home page handles book search and pagination
// Fetches data from Gutendex API based on searchTerm
function Home() {
  // Retrieve search term from global context
  const { searchTerm } = useOutletContext();
  // Local state for API data and UI control
  const [books, setBooks] = useState([]);
  const [nextUrl, setNextUrl] = useState(null);
  const [prevUrl, setPrevUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Reusable function to fetch books from API
  function fetchBooks(url) {
    setLoading(true);
    setError(null);

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.results);
        setNextUrl(data.next);
        setPrevUrl(data.previous);
        setLoading(false);
      })
      .catch(() => {
        setError("Something went wrond");
        setLoading(false);
      });
  }

  // Trigger fetch when searchTerm changes
  useEffect(() => {
    if (!searchTerm) return;

    setLoading(true);
    setError(null);

    fetchBooks(`https://gutendex.com/books?search=${searchTerm}`);
  }, [searchTerm]);

  // Conditional UI rendering
  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* <h1>Home page</h1> */}
      <div className={styles.hero}>
        <h1 className={styles.title}>Discover timeless books</h1>
        <p className={styles.subtitle}>
          Search and explore classic literature from Project Gutenberg.
        </p>
      </div>

      <BookList books={books} />

      {/* Pagination controls */}
      {prevUrl && <button onClick={() => fetchBooks(prevUrl)}>Previous</button>}
      {nextUrl && <button onClick={() => fetchBooks(nextUrl)}>Next</button>}
    </div>
  );
}

export default Home;
