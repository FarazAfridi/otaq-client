import styles from "./navigation.module.css";
import stdcLogo from "@/assets/icon_logo.png";
import Image from 'next/image';

export default function MobileNavigationItems() {
  return (
    <div className={styles["mobile--header__navigation--items"]}>
      <Image src={stdcLogo} alt="" width={50} />
      <div className={styles["navigation__items--container"]}>
        <ul className=''><li>Home</li><li>Places</li><li>Services</li><li>About Us</li><li>Contact Us</li></ul>
      </div>
    </div>
  )
}