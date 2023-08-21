import styles from "@/styles/cardPage.module.css";
import Image from "next/image";
import heartIcon from "@/assets/heart-icon.svg";
import uploadIcon from "@/assets/upload-icon.svg";
import axios from "axios";
import { toast } from "react-toastify";

import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Navigation from "@/components/navigation/navigation";
import Footer from "@/components/footer/footer";

export default function SinglePlace() {
  const [token, setToken] = useState(null);
  const [book, setBook] = useState(null);
  const [days, setDays] = useState(1);
  const [place, setPlace] = useState(null);
  const [rooms, setRooms] = useState(null);
  const [room, setRoom] = useState();

  const startDate = useRef();
  const lastDate = useRef();

  function getDays() {
    if (startDate.current.value && lastDate.current.value) {
      var date1 = new Date(startDate.current.value);
      date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset());

      var date2 = new Date(lastDate.current.value);
      date2.setMinutes(date2.getMinutes() - date2.getTimezoneOffset());

      var millisecondsPerDay = 24 * 60 * 60 * 1000;
      const result = (date2 - date1) / millisecondsPerDay;
      setDays(result);
    }
  }

  function getRoomType(value) {
    const filteredRoom = rooms.filter((room) => room.name === value);
    setRoom(filteredRoom);
  }

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const router = useRouter();
  const { pid } = router.query;

  const bookPlace = async () => {
    if (!startDate.current.value || !lastDate.current.value) {
      toast("No field should be empty", {
        hideProgressBar: true,
        autoClose: 2000,
        type: "error",
      });
      return;
    } else {
      axios
        .post(
          "https://otaq-api.azurewebsites.net/places/book",
          {
            placeId: place._id,
            startDate: startDate.current.value,
            lastDate: lastDate.current.value,
            room: room[0].name,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: "bearer " + token,
            },
          }
        )
        .then(function (response) {
          if (response.status === 401) {
            toast("Session expired, Please login again", {
              hideProgressBar: true,
              autoClose: 2000,
              type: "error",
            });
            localStorage.removeItem("token");
            router.push("/login");
            return;
          }
          setBook(response.data);
          if (response.data === "Sorry! The room is already booked") {
            toast(response.data, {
              hideProgressBar: true,
              autoClose: 2000,
              type: "error",
            });
          } else {
            toast(response.data, {
              hideProgressBar: true,
              autoClose: 2000,
              type: "success",
            });
          }
        })
        .catch(function (error) {
          console.log(error);
          // localStorage.removeItem("token");
          // router.push("/login");
        });
    }
  };
  console.log(process.env.BASEURL);
  useEffect(() => {
    async function getPlace() {
      if (router.isReady) {
        const resp = await fetch(
          `https://otaq-api.azurewebsites.net/places/get/approved/${pid}`
        );
        const data = await resp.json();
        setPlace(data);
        setRooms([data.roomOne, data.roomTwo, data.roomThree]);
        setRoom(
          [data.roomOne, data.roomTwo, data.roomThree].filter(
            (room) => room.name === "Deluxe"
          )
        );
      }
    }
    getPlace();
  }, [pid]);

  return (
    <>
      {place ? (
        <>
          <Navigation />
          <div className={styles["main-content"]}>
            <Image
              className={styles["card--banner"]}
              src={
                "data:image/jpeg;base64," +
                place.roomOne.images[0].data.toString("base64")
              }
              alt=""
              fill
            />
          </div>
          <div className={styles["card--page"]}>
            <div className={styles["card-page"]}>
              {/* <div className={styles["text--container"]}>
            <h2>{place.name}</h2>
            <div className={styles["extra--info"]}>
              <div className={styles["reviews-wrapper"]}>
                <a href="">2 Reviews</a>
                <a href="">{place.name}</a>
              </div>
              <div className={styles.icons}>
                <div className={styles["icon-text"]}>
                  <Image src={uploadIcon} alt="" />
                  <a href="">Share</a>
                </div>
                <div className={styles["icon-text"]}>
                  <Image src={heartIcon} alt="" />
                  <a href="">Save</a>
                </div>
              </div>
            </div>
          </div> */}
              <div className={styles["apartment-info"]}>
                <div className={styles["extra-apartment-info"]}>
                  <h2>{place.name}</h2>
                  <ul className={styles["apartment--details"]}>
                    <li>16+ guests</li>
                    <li>8 bedrooms</li>
                    <li>8 beds</li>
                    <li>10 baths</li>
                  </ul>
                  <div className="divider"></div>
                  <span>
                    Modernism and vintage Thai art on coastal hillside
                  </span>
                  <div className={styles["apartment--description"]}>
                    <strong>The space</strong>
                    <p>
                      The ideal spot for entertaining large groups, twenty-four
                      is the biggest and most amenity filled villa in the
                      Samujana development. Indoor and outdoor areas are
                      spacious enough for a large amount of guests, merging
                      seamlessly in an open concept design.
                    </p>
                  </div>
                  <div className={styles["apartment--gallery"]}>
                    <div className={styles["gallery--two-images"]}>
                      <Image
                        src={
                          "data:image/jpeg;base64," +
                          room[0].images[1].data.toString("base64")
                        }
                        alt=""
                        width={300}
                        height={300}
                      />
                      <Image
                        src={
                          "data:image/jpeg;base64," +
                          room[0].images[2].data.toString("base64")
                        }
                        alt=""
                        width={300}
                        height={300}
                      />
                    </div>
                    <div className={styles["gallery--three-images"]}>
                      <Image
                        src={
                          "data:image/jpeg;base64," +
                          room[0].images[0].data.toString("base64")
                        }
                        alt=""
                        width={300}
                        height={300}
                      />
                      <Image
                        src={
                          "data:image/jpeg;base64," +
                          room[0].images[1].data.toString("base64")
                        }
                        alt=""
                        width={300}
                        height={300}
                      />
                      <Image
                        src={
                          "data:image/jpeg;base64," +
                          room[0].images[2].data.toString("base64")
                        }
                        alt=""
                        width={300}
                        height={300}
                      />
                    </div>
                  </div>
                </div>
                <div className={styles["apartment--card"]}>
                  <div className={styles["price-info--container"]}>
                    <div className={styles.row}>
                      <h3>Rs{room[0].price}</h3>
                      <span>night</span>
                    </div>
                    <a href="">2 reviews</a>
                  </div>
                  <div className={styles["date--container"]}>
                    <div className={styles.date}>
                      <div className={styles.row}>
                        <input
                          required
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          ref={startDate}
                          onChange={getDays}
                        />
                        <input
                          required
                          type="date"
                          min={new Date().toISOString().split("T")[0]}
                          ref={lastDate}
                          onChange={getDays}
                        />
                      </div>
                      <select
                        name="guests"
                        onChange={(e) => getRoomType(e.target.value)}
                      >
                        <option defaultChecked value="Deluxe">
                          Deluxe
                        </option>
                        <option value="Executive">Executive</option>
                        <option value="Super Deluxe">Super Deluxe</option>
                      </select>
                    </div>
                    <button disabled={book ? true : false} onClick={bookPlace}>
                      {book ? "BOOKED" : "Reserve"}
                    </button>
                    <span>You won&apos;t be charged yet</span>
                  </div>
                  <div className={styles["price--details"]}>
                    <div className={styles.row}>
                      <a href="">
                        Rs{room[0].price} x {days} nights
                      </a>
                      <span>{room[0].price * days}</span>
                    </div>
                    <div className={styles.row}>
                      <span>Weekly stay discount</span>
                      <span>00.00</span>
                    </div>
                    <div className={styles.row}>
                      <a href="">Hospitality fees</a>
                      <span>00.00</span>
                    </div>
                  </div>
                  <div className="divider"></div>
                  <div className={styles["final-price--container"]}>
                    <span>Total before taxes</span>
                    <span>Rs{room[0].price * days}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </>
      ) : (
        <h1>Loading....</h1>
      )}
    </>
  );
}
