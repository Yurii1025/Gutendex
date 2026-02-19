import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import BookList from "../components/BookList";
import Loader from "../components/Loader";

// Category page renders books filtered by topic
// Uses dynamic route parameter (:name)


function Category() {

    // Local state for API data and UI control
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Extract category name from URL
    const { name } = useParams();

    const [nextUrl, setNextUrl] = useState(null);
    const [prevUrl, setPrevUrl] = useState(null);

    // Reusable fetch function for category and pagination
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

    // Fetch books whenever category changes
    useEffect(() => {
        fetchBooks(`https://gutendex.com/books?topic=${name}`);
    }, [name]);


    // Conditional rendering
    if (loading) return <Loader />;
    if (error) return <p>Error: {error}</p>;

    
    return (
        <div>
            <h1>Category: {name}</h1>
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