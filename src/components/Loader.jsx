import styles from "./Loader.module.css";

// Loader component provides visual feedback during async operations
// Pure presentational and reusable component

function Loader() {
  return (
    <div className={styles.wrapper}>

      {/* Animated progress bar */}
      <div className={styles.bar}>
        <div className={styles.stripes}></div>
      </div>

      {/* Informational message */}
      <p className={styles.text}>Loading books...</p>
    </div>
  );
}

export default Loader;
