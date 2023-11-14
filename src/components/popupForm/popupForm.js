import { useState } from "react";
import Popup from "reactjs-popup";
import styles from "./popup.module.css";
import Image from "next/image";

export default function PopupForm(props) {
  const [roomPrice, setRoomPrice] = useState({
    roomOnePrice: props.price[0],
    roomTwoPrice: props.price[1],
    roomThreePrice: props.price[2],
  });

  function handleForm() {
    props.updateListing(
      props.id,
      roomPrice.roomOnePrice,
      roomPrice.roomTwoPrice,
      roomPrice.roomThreePrice
    );
  }

  return (
    <Popup
      trigger={
        <div className={styles.button_container}>
          <button className={styles.button}>{props.buttonText}</button>
        </div>
      }
      modal
      nested
    >
      {(close) => (
        <div className={styles.main_popup}>
          <button className={styles.close} onClick={close}>
            <Image src="/images/close.svg" width={30} height={30} />
          </button>
          <div className={styles.form_container}>
            <label className={styles.label}>Deluxe Price</label>
            <input
              required
              className={styles.input}
              onChange={(e) =>
                setRoomPrice({ ...roomPrice, roomOnePrice: e.target.value })
              }
              type="number"
              value={roomPrice.roomOnePrice}
            />
            <label className={styles.label}>Executive Price</label>
            <input
              className={styles.input}
              required
              onChange={(e) =>
                setRoomPrice({ ...roomPrice, roomTwoPrice: e.target.value })
              }
              type="number"
              value={roomPrice.roomTwoPrice}
            />
            <label className={styles.label}>Super Deluxe Price</label>
            <input
              required
              className={styles.input}
              onChange={(e) =>
                setRoomPrice({ ...roomPrice, roomThreePrice: e.target.value })
              }
              type="number"
              value={roomPrice.roomThreePrice}
            />
            <button className={styles.submit_button} onClick={handleForm}>
              Submit
            </button>
          </div>
        </div>
      )}
    </Popup>
  );
}
