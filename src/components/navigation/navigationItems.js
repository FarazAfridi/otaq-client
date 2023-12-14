import styles from "./navigation.module.css";
import stdcLogo from "@/assets/icon_logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import NewSearch from "../newSearch/newSearch";
import { useState } from "react";

export default function NavigationItems() {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false)
  const onClose = () => setModalOpen(false)
  return (
    <div className={styles["header__navigation--items"]}>
    <NewSearch open={modalOpen} onClose={onClose}/>
      <Image style={{cursor: 'pointer'}} src={stdcLogo} alt="" width={50} onClick={() => router.push("/")} />
      {/* <div className={styles["navigation__items--container"]}>
        <ul className="">
          <li onClick={() => router.push("/")}>Home</li>
          <li>
            <a href="#places">Places</a>
          </li>
          <li>
            <a href="#testimonials">Testimonials</a>
          </li>
          <li>
            <a href="#footer">About Us</a>
          </li>
          <li>
            <a href="#footer">Contact Us</a>
          </li>
        </ul>
      </div> */}
      <div className={styles["header__search_container"]} onClick={() => setModalOpen(true)}>
        <div className={styles["header__search_container--text"]}>Where do you wanna go ?</div>
        <div className={styles["header__search_container__icon"]}>
          <svg
            stroke="currentColor"
            fill="currentColor"
            stroke-width="0"
            viewBox="0 0 24 24"
            height="18"
            width="18"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 18a7.952 7.952 0 0 0 4.897-1.688l4.396 4.396 1.414-1.414-4.396-4.396A7.952 7.952 0 0 0 18 10c0-4.411-3.589-8-8-8s-8 3.589-8 8 3.589 8 8 8zm0-14c3.309 0 6 2.691 6 6s-2.691 6-6 6-6-2.691-6-6 2.691-6 6-6z"></path>
          </svg>
        </div>
      </div>
    </div>
  );
}
