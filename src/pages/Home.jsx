import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
    const { searchTerm } = useOutletContext();
    const [books, setBooks] = useState([]);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!searchTerm) return;

        setLoading(true);
        setError(null);

        fetch(`https://gutendex.com/books?search=${searchTerm}`)
        .then((res) => res.json())
        .then((data) => {
            setBooks(data.results);
            setLoading(false);
        })
        .catch((err) => {
            setError("Something went wrong");
            setLoading(false);
        });
    }, [searchTerm]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1>Home page</h1>

            {books.map((book) => (
                <div key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title}
                    </Link>
                </div>
            ))}
        </div>
        
    );
}

export default Home;