import styles from "./top-destinations.module.css";
import Image from "next/image";

export default function Destination(props) {
  return (
    <div className={styles.destination}>
      <Image src={props.image} fill alt="resort" />
      <span>{props.name}</span>
    </div>
  );
}
