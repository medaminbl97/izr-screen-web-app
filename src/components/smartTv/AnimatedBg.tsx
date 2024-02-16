import React from "react";
import styles from "../styles/bgStyles.module.css";

function AnimatedBg() {
  return (
    <div>
      <div className={styles["wave"]}></div>
      <div className={styles["wave"]}></div>
      <div className={styles["wave"]}></div>
    </div>
  );
}

export default AnimatedBg;
