import styles from "./navbar.module.css";
import Item from './Item';
import sliderIcon from "@/assets/sliders.svg"
import Image from 'next/image';
import { Carousel } from 'react-responsive-carousel';

export default function Navbar() {
  return (
    <div className={styles.navbar}>
      <div className={styles["navbar__item--container"]}>
          <Item itemText="Thatta" />
          <Item itemText="Sehwan" />
          <Item itemText="Larkana" />
          <Item itemText="Sanghar" />
          <Item itemText="Nagarparkar" />
          <Item itemText="Peshawar" />
          <Item itemText="Thar parkar" />
          <Item itemText="Mithi" />
          <Item itemText="Karachi" />
      </div>
      <button className={styles["filter-button"]}>
        <div className={styles["icon-text--container"]}>
          <Image src={sliderIcon} alt="slider Icon" /> Filters
        </div>
      </button>
    </div>
  )
}
