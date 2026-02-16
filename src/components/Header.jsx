import { Link } from "react-router-dom";
import { useState } from "react";

const categories = [
  "fiction",
  "mystery",
  "thriller",
  "romance",
  "fantasy",
  "morality",
  "society",
  "power",
  "justice",
  "adventure",
  "tragedy",
  "war",
  "philosophy"
];


function Header ({ onSearch }) {
    const [input, setInput] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        onSearch(input);
    }

    return (
        <nav>
            <Link to="/">Home</Link> |{" "}
            <Link to="/favorites">Favorites</Link> |{" "}
            <div>
                {categories.map((cat) => (
                    <Link
                        key={cat}
                        to={`/category/${cat}`}
                        style={{marginRight: "10px"}}
                    >
                        {cat}
                    </Link>
                ))}
            </div>
            {/* <Link to="/category/fiction">Fiction</Link> */}

            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Serch books..."
                />
                <button type="submit">Search</button>
            </form>
        </nav>
    );
}


export default Header;