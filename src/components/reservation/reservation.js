import styles from "./reservation.module.css";

export default function Reservation() {
  return (
    <div className={styles["reservation--container"]}>
      <div className={styles.reservation}>
        <h2>Make Your Reservation</h2>
        <input type="text" placeholder="Where do you want to go?" />
        <div className={styles.row}>
          <input type="date" />
          <input type="date" />
        </div>
        <input type="number" defaultValue={1} max={100} min={1} />
        <button className="pink-button">Search</button>
      </div>
    </div>
  );
}
