import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";

function Favorites() {
    const { favorites, removeFromFavorites } = useOutletContext();

    return (
        <div>
            <h1>Favorites page</h1>

            {favorites.length == 0 && <p>No faorites yet</p>}

            {favorites.map((book) => (
                <div key={book.id}>
                    <Link to={`/book/${book.id}`}>
                        {book.title}
                        <button onClick={() => removeFromFavorites(book.id)}>
                            Remove
                        </button>
                    </Link>
                </div>
            ))}
            
        </div>
    );
}

export default Favorites;