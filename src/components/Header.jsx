import { Link, NavLink, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import styles from "./Header.module.css";
// NavLink for active navigation styling.
// useLocation to react to route changes.
// useRef to detect clicks outside the dropdown.
// useEffect to manage side effects such as event listeners and body scroll locking.

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
// The component maintains local UI state:
// input for controlled search input.
// showCategory to toggle the desktop dropdown.
// mobileOpen to control the mobile sidebar.
// This state is UI-specific and not lifted globally.
  const [input, setInput] = useState("");
  const [showCategory, setShowCategory] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  //A ref is used to reference the dropdown container in the DOM. This enables click-outside detection via manual DOM event listeners.
  const dropdownRef = useRef(null);
  //useLocation allows the component to react to route changes. It is used to automatically close the dropdown when navigation occurs.
  const location = useLocation();

  function handleSubmit(e) {
    e.preventDefault();
    onSearch(input);
  }

  //This effect attaches a global event listener to detect clicks outside the dropdown. Cleanup is properly handled to prevent memory leaks.
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

  //Locks background scrolling when mobile sidebar is open. Ensures modal-like behavior and improves mobile UX.
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
        {/*NavLink provides active state detection and conditional styling for current routes.*/}
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              isActive ? styles.activeLink : styles.link
            }
          >
            Favorites
          </NavLink>

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
          <NavLink
            to="/"
            end
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              isActive ? styles.activeSidebarLink : ""
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              isActive ? styles.activeSidebarLink : ""
            }
          >
            Favorites
          </NavLink>
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
