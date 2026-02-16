import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import BookList from "../components/BookList";
// import { Link } from "react-router-dom";

function Home() {
    const { searchTerm } = useOutletContext();
    const [books, setBooks] = useState([]);

    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function fetchBooks(url) {
        setLoading(true);
        setError(null);

        fetch(url)
            .then(res => res.json())
            .then(data => {
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

    useEffect(() => {
        if (!searchTerm) return;

        setLoading(true);
        setError(null);

        fetchBooks(`https://gutendex.com/books?search=${searchTerm}`);
    }, [searchTerm]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Home page</h1>

            {/* {books.map((book) => (
                <div key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title}
                    </Link>
                </div>
            ))} */}
            <BookList books={books} />

            {prevUrl && (
                <button onClick={()=> fetchBooks(prevUrl)}>
                    Previous
                </button>
            )}

            {nextUrl && (
                <button onClick={() => fetchBooks(nextUrl)}>
                    Next
                </button>
            )}
        </div>
        
    );
}

export default Home;