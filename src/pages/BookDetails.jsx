import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

function BookDetails() {
    const { id } = useParams();
    const { addToFavorites } = useOutletContext();

    
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setError(null);

        fetch(`https://gutendex.com/books/${id}`)
        .then((res) => res.json())
        .then((data) => {
            setBook(data);
            setLoading(false);
        })
        .catch(() => {
            setError("Something went wrond");
            setLoading(false);
        });
    }, [id]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>
    if (!book) return null;

    return (
        <div>
            <h1>{book.title}</h1>

            <p>
                Author: {book.authors[0]?.name}
            </p>

            <p>
                Downloads: {book.download_count}
            </p>

            <p>
                Languages: {book.languages.join(", ")}
            </p>

            {book.formats["image/jpeg"] && (
                <img
                    src={book.formats["image/jpeg"]}
                    alt={book.title}
                    width="200"
                />
            )}

            <button onClick={() => addToFavorites(book)}>
                Add to Favorites
            </button>
        </div>
    )
}

export default BookDetails;