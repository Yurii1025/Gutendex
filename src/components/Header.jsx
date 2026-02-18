import { Link, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
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
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowCategory(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setShowCategory(false);
  }, [location]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <div className={styles.logo}>Gutendex</div>
        <button className={styles.burger} onClick={() => setMobileOpen(true)}>
          ☰
        </button>
        <nav className={styles.nav}>
          <Link to="/" className={styles.link}>
            Home
          </Link>
          <Link to="/favorites" className={styles.link}>
            Favorites
          </Link>

          <div className={styles.dropdown} ref={dropdownRef}>
            <button
              onClick={() => setShowCategory((prev) => !prev)}
              className={styles.link}
            >
              Categories ↓
            </button>

            <div
              className={`${styles.dropdownMenu} ${showCategory ? styles.active : ""}`}
            >
              {categories.map((cat) => (
                <Link
                  key={cat}
                  to={`/category/${cat}`}
                  className={styles.dropdownItem}
                  onClick={() => setShowCategory(false)}
                >
                  {cat}
                </Link>
              ))}
            </div>
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
          <button type="submit" className={styles.button}>
            Search
          </button>
        </form>
      </div>
      <div
        className={`${styles.overlay} ${mobileOpen ? styles.show : ""}`}
        onClick={() => setMobileOpen(false)}
      ></div>

      <div className={`${styles.sidebar} ${mobileOpen ? styles.open : ""}`}>
        <button className={styles.close} onClick={() => setMobileOpen(false)}>
          ✕
        </button>

        <div className={styles.section}>
          <Link to="/" onClick={() => setMobileOpen(false)}>
            Home
          </Link>
          <Link to="/favorites" onClick={() => setMobileOpen(false)}>
            Favorites
          </Link>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.section}>
          <p className={styles.sectionTitle}>Categories</p>

          {categories.map((cat) => (
            <Link
              key={cat}
              to={`/category/${cat}`}
              onClick={() => setMobileOpen(false)}
            >
              {cat}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}

export default Header;
