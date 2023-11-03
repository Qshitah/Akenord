import React, { useEffect, useState } from "react";
import styles from "./NotFound.module.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div id={styles.body}>
      <div className="404">
        <div class={styles.shadow}>
          <img src="/404.png" alt="404 error" class={styles.image} />
        </div>
        <div class={styles.whole_text}>
          <p class={styles.page_not_found}>Page not found</p>
          <p class={styles.text}>
            Looks like you’re lost in space. Head back to the home page.
            <br />
            And take him with you, will ya?
          </p>
        </div>
        <div class={styles.button_container}>
          <button class={styles.button}><Link to='/' style={{textDecoration: "none"}}>Go to Homepage</Link></button>
        </div>
      </div>

    </div>
  );
}
