import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

function Category() {

    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://gutendex.com/books?topic=${name}`)
        .then(res => res.json())
        .then(data => {
            setBooks(data.results);
            setLoading(false);
        })
        .catch(() => {
            setError("Something went wrond");
            setLoading(false);
        });
    }, [name]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    
    return (
        <div>
            <h1>Category: {name}</h1>

            {books.map(book => (
                <div key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title}
                    </Link>
                </div>
            ))}
        </div>
    );
    
}


export default Category;