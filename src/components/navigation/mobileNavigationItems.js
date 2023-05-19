import styles from "./navigation.module.css";
import stdcLogo from "@/assets/icon_logo.png";
import Image from 'next/image';
import { useRouter } from "next/router";

export default function MobileNavigationItems() {
  const router = useRouter()
  return (
    <div className={styles["mobile--header__navigation--items"]}>
      <Image src={stdcLogo} alt="" width={50} />
      <div className={styles["navigation__items--container"]}>
        <ul className=''><li onClick={() => router.push("/")}>Home</li><li ><a href="#places">Places</a></li><li><a href="#testimonials">Testimonials</a></li><li><a href="#footer">About Us</a></li><li><a href="#footer">Contact Us</a></li></ul>
      </div>
    </div>
  )
}