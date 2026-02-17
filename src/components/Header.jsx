import { Link } from "react-router-dom";
import { useState } from "react";
import styles from "./Header.module.css";

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
  "philosophy",
];

function Header({ onSearch }) {
  const [input, setInput] = useState("");
  const [showCategory, setShowCategory] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input);
  }

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Gutendex books</div>

        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/favorites" className={styles.link}>Favorites</Link>
          
          <div className={styles.dropdown}>
            <button
                onClick={() => setShowCategory(prev => !prev)}
                className={styles.link}
                >Categories ▾
            </button>

            {showCategory && (
            <div className={styles.dropdownMenu}>
                {categories.map((cat) => (
                    <Link key={cat} to={`/category/${cat}`} className={styles.dropdownItem}>{cat}</Link>
                ))}
            </div>
          )}
          </div>

          

            
        </nav>

        <form onSubmit={handleSubmit} className={styles.search}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Serch books..."
            className={styles.input}
          />
          <button type="submit" className={styles.button}>Search</button>
        </form>
      </div>
    </header>
  );
}

export default Header;
