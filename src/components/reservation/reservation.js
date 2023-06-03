import { useRef, useState } from "react";
import styles from "./reservation.module.css";

export default function Reservation(props) {
  const [city, setCity] = useState()
  const [roomType, setRoomType] = useState()

  const guests = useRef();

  const handleSearch = () => {
    props.search({city, persons: guests.current.value, roomType})
  }

  return (
    <div className={styles["reservation--container"]}>
      <div className={styles.reservation}>
        <h2>Make Your Reservation</h2>
        <input className={styles["area--input"]} type="text" placeholder="Where do you want to go?" onChange={(e) => setCity(e.target.value)} />
        <div className={styles.row}>
          {/* <input ref={startDate} type="date" min={new Date().toISOString().split("T")[0]} />
          <input ref={lastDate} type="date"  min={new Date().toISOString().split("T")[0]} /> */}
          <select className={styles["select"]} onChange={e => setRoomType(e.target.value)} name="roomType">
                <option selected disabled hidden>Room Type</option>
                <option value="">None</option>
                <option value='Normal' >Normal</option>
                <option value='Air Conditioned' >Air Conditioned</option>
              </select>
        </div>
        <input ref={guests} type="number" placeholder="Guests" defaultValue={1} max={100} min={1} />
        <button className="pink-button" onClick={handleSearch}>Search</button>
      </div>
    </div>
  );
}
