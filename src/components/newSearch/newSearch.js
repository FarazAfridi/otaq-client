import Popup from "reactjs-popup";
import styles from "./newSearch.module.css";
import Image from "next/image";
import { useState } from "react";

export default function NewSearch(props) {
  const [city, setCity] = useState();
  const [placeQuery, setPlaceQuery] = useState();

  const handleSearch = () => {
    props.search({ city, query: placeQuery });
  };

  return (
    <Popup
      open={props.open}
      onClose={() => props.onClose()}
      closeOnDocumentClick
      modal
      nested
    >
      {(close) => (
        <div className={styles.main_popup}>
          <button className={styles.close} onClick={close}>
            <Image
              src="/images/close.svg"
              width={30}
              height={30}
              alt="close button"
            />
          </button>
          <div className={styles["reservation--container"]}>
            <div className={styles.reservation}>
              <h2>Where do you wanna go ?</h2>
              <input
                required
                className={styles["area--input"]}
                type="text"
                placeholder="Where do you want to go?"
                onChange={(e) => setPlaceQuery(e.target.value)}
              />
              <div className={styles.row}>
                <select
                  className={styles["select"]}
                  required
                  onChange={(e) => setCity(e.target.value)}
                  name="city"
                >
                  <option selected disabled hidden>
                    City
                  </option>
                  <option value="">None</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Larkana">Larkana</option>
                  <option value="Hyderabad">Hyderabad</option>
                  <option value="Sukkur">Sukkur</option>
                  <option value="Thatta">Thatta</option>
                  <option value="Dadu">Dadu</option>
                </select>
              </div>

              <button className="pink-button" onClick={handleSearch}>
                Search
              </button>
            </div>
          </div>
        </div>
      )}
    </Popup>
  );
}
