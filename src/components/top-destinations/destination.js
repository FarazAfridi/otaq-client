import styles from "./top-destinations.module.css";
import Image from "next/image";
import { useRouter } from 'next/router';

export default function Destination(props) {

  const router = useRouter();

  return (
    <div className={styles.destination} onClick={() => router.push(`/city/${props.link}`)}>
      <Image src={props.image} fill alt="resort" />
      <span>{props.name}</span>
    </div>
  );
}
