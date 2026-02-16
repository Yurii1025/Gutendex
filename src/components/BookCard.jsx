import { Link } from "react-router-dom";

function BookCard ({ book }) {
    const image = book.formats["image/jpeg"];
    const author = book.authors[0]?.name || "Unknown author";

    return (
        <div>
            <Link to={`/book/${book.id}`} >
                {image && (
                    <img
                        src={image}
                        alt={book.title}
                        width="120"
                    />
                )}
                <h3>{book.title}</h3>
                <p>{author}</p>
            </Link>
        </div>
    )
}

export default BookCard;