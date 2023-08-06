import { useState } from "react";
import styles from "./reservation.module.css";

export default function Reservation(props) {
  const [city, setCity] = useState()
  const [placeQuery, setPlaceQuery] = useState()

  const handleSearch = () => {
    props.search({city, query: placeQuery})
  }

  return (
    <div className={styles["reservation--container"]}>
      <div className={styles.reservation}>
        <h2>Make Your Reservation</h2>
        <input required className={styles["area--input"]} type="text" placeholder="Where do you want to go?" onChange={(e) => setPlaceQuery(e.target.value)} />
        <div className={styles.row}>
          {/* <input ref={startDate} type="date" min={new Date().toISOString().split("T")[0]} />
          <input ref={lastDate} type="date"  min={new Date().toISOString().split("T")[0]} /> */}
          <select className={styles["select"]} required onChange={e => setCity(e.target.value)} name="city">
                <option selected disabled hidden>City</option>
                <option value="">None</option>
                <option value='Karachi' >Karachi</option>
                <option value='Larkana' >Larkana</option>
                <option value='Hyderabad' >Hyderabad</option>
                <option value='Sukkur' >Sukkur</option>
                <option value='Thatta' >Thatta</option>
                <option value='Dadu' >Dadu</option>
              </select>
        </div>
        {/* <input ref={guests} type="number" placeholder="Guests" defaultValue={1} max={100} min={1} /> */}
        <button className="pink-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}
