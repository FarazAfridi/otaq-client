import React from 'react';

import styles from "./header.module.css";

const Header = () => {
  return (
    <>
    <div className={styles.header}>
      <div className={styles["header--items--container"]}>
        <div className={styles.header__search_container}>
          
          <div className={styles.header__buttons}>
            <button className={styles.header__button}>Anywhere</button>
            <span className={styles.divider}>|</span>
            <button className={styles.header__button}>Any week</button>
          </div>

          <span className={styles.divider}>|</span>

          <div className={styles.header__search_button}>
            <button style={{ color: '#A1A1A1', fontWeight: 'normal' }} className={styles.header__button}>Add guests</button>
            <div className={styles.header__search_icon}>
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
              </svg>
            </div>
          </div>
          
        </div>
      </div>

    </div>
    </>
  );
}

export default Header;