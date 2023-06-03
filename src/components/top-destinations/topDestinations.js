import Destination from "./destination";
import styles from "./top-destinations.module.css";

export default function TopDestinations() {
  return (
    <div className={styles["top-destinations"]}>
      <h1>Top Destinations</h1>
      <p>Best places where to live in the world and enjoy your trip</p>
      <div className={styles["destinations--container"]}>
        <Destination image="/images/karachi.jpg" name="Karachi" link="karachi" />
        <Destination image="/images/larkana.jpg" name="Larkana" link="larkana" />
        <Destination image="/images/hyderabad.jpg" name="Hyderabad" link="hyderabad"/>
        <Destination image="/images/sukkur.jpg" name="Sukkur" link="sukkur" />
        <Destination image="/images/thatha.jpg" name="Thatta" link="thatta" />
        <Destination image="/images/dadu.jpg" name="Dadu" link="dadu" />
      </div>
    </div>
  );
}
