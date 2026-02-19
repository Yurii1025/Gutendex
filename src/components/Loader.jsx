import styles from "./Loader.module.css";

function Loader() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.bar}>
        <div className={styles.stripes}></div>
      </div>
      <p className={styles.text}>Loading books...</p>
    </div>
  );
}

export default Loader;
