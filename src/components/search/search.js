import React, { useState } from "react";

import styles from "./search.module.css";

const Search = (props) => {

  const [searchValue, setSearchValue] = useState(null)

  const handleChange = (e) => {
    setSearchValue({...searchValue, [e.target.name]:e.target.value});
  }
  return (
    <div className={styles["search--container"]}>
      <div className={styles.search}>
        <div className={styles["search--items--container"]}>
          <div className={styles.search__search_container}>
            <div className={styles.search__buttons}>
              <select onChange={e => handleChange(e)} className={styles.search__button} name="price">
                <option selected disabled hidden>Price</option>
                <option value="">None</option>
                <option value="2000">2000</option>
                <option value="4000">4000</option>
                <option value="6000">6000</option>
                <option value="8000">8000</option>
              </select>
              <span className={styles.divider}>|</span>
              <select onChange={e => handleChange(e)} className={styles.search__button} name="roomType">
                <option selected disabled hidden>Room Type</option>
                <option value="">None</option>
                <option value='Normal' >Normal</option>
                <option value='Air Conditioned' >Air Conditioned</option>
              </select>
              <div className={styles.search__search_icon} onClick={() => props.handleSearch(searchValue)}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-search"
                  viewBox="0 0 16 16"
                >
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
