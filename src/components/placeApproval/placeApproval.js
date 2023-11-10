import Image from "next/image";
import { Carousel } from "react-responsive-carousel";
import styles from "../card/card.module.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import checkIcon from "@/assets/check.svg";
import cancel from "@/assets/close.svg";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

export default function PlaceApproval(props) {
  console.log(props)

  const router = useRouter()

  async function approvePlace(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://otaq-api.onrender.com/places/add/approved",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
        }),
      }
    );
    const data = await response.json();
  }

  async function removeUnApprovedPlace(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://otaq-api.onrender.com/places/remove/unapproved",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();
    if (response.ok) {
      toast("User logged in successfully", { hideProgressBar: true, autoClose: 2000, type: 'success' })
      router.reload(window.location.pathname)
    }
  }

  async function removeApprovedPlace(id) {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "https://otaq-api.onrender.com/places/remove/approved",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      }
    );
    const data = await response.json();
      if (response.ok) {
        router.reload(window.location.pathname)
      }
  }

  return (
   
    <div className={styles["unapproved-place"]}>
      <div>
 
          <div className={styles.card__image_container}>
            <Image
              src={props.images[0] && props.images[0].data}
              width={300}
              height={300}
              alt=""
            />
          </div>
          
      </div>
      <div className={styles["place--text"]}>
        <div className={styles.card__name}>
          <p>{props.name}</p>
        </div>
        <div className={styles.card__distance}>
          <p>{props.description}</p>
        </div>
        <div className={styles.card__price_container}>
          <span className={styles.card__price}>Rs{props.price} </span>
          <span className={styles.card__night}>night</span>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {!props.approvedPlaces ? (
              <Image
                onClick={() => approvePlace(props.id)}
                src={checkIcon}
                alt="check"
              />
            ) : null}
            <Image
              onClick={() => {
                props.approvedPlaces
                  ? removeApprovedPlace(props.id)
                  : removeUnApprovedPlace(props.id);
              }}
              src={cancel}
              alt="cancel"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
