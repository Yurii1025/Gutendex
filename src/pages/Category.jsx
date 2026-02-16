import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookList from "../components/BookList";

function Category() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { name } = useParams();

    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

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
                setError("Something went wrong");
                setLoading(false);
            });
    }

    useEffect(() => {

        fetchBooks(`https://gutendex.com/books?topic=${name}`);
        // .then(res => res.json())
        // .then(data => {
        //     setBooks(data.results);
        //     setLoading(false);
        // })
        // .catch(() => {
        //     setError("Something went wrond");
        //     setLoading(false);
        // });
    }, [name]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    
    return (
        <div>
            <h1>Category: {name}</h1>

            {/* {books.map(book => (
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


export default Category;