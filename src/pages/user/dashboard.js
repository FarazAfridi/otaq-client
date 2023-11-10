import { useEffect, useState } from "react";
import styles from "@/styles/admin.module.css";
import Table from "@/components/table/tableComponent";
import styles2 from "@/components/card/card.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { toast } from "react-toastify";
import Popup from "reactjs-popup";
import PopupForm from './../../components/popupForm/popupForm';

export default function Dashboard() {
  const [tab, setTab] = useState("dashboard");
  const [booking, setBooking] = useState([]);
  const [listing, setListing] = useState([]);
  const [favourites, setFavourites] = useState([]);

  const router = useRouter();

  const [userSetting, setUserSetting] = useState({
    name: "",
    email: "",
    password: "",
  });

  async function updateListing (placeId, roomOnePrice, roomTwoPrice, roomThreePrice) {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:4000/places/update/listing",
          {
            body: JSON.stringify({
              placeId,
              roomOnePrice,
              roomTwoPrice,
              roomThreePrice
            }),
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            }
          }
        );
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
        const data = await response.json();
        if(response.ok) {
          toast("Place updated!", {
            hideProgressBar: true,
            autoClose: 2000,
            type: "success",
          });
          router.reload()
        }
        
    }
  }
 
  useEffect(() => {
    if (!router.isReady) return;
    if (!router.query.tab || !router.query) {
      setTab("dashboard");
    } else if (router.query.tab === "bookedPlaces") {
      setTab(router.query.tab);
      if (typeof window !== "undefined") {
        async function getUserBookings() {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "https://otaq-api.onrender.com/places/get/booking",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
          const data = await response.json();
          setBooking(data);
        }
        getUserBookings();
      }
    } else if (router.query.tab === "settings") {
      setTab(router.query.tab);
      if (typeof window !== "undefined") {
        async function getUserData() {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "https://otaq-api.onrender.com/auth/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
          const data = await response.json();
          setUserSetting({
            name: data[0].name,
            email: data[0].email,
            password: "",
          });
        }
        getUserData();
      }
    } else if (router.query.tab === "listedPlaces") {
      setTab(router.query.tab);
      if (typeof window !== "undefined") {
        async function getListings() {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "http://localhost:4000/places/get/listing",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
          const data = await response.json();
          setListing(data[0].listing);
        }
        getListings();
      }
    } else if (router.query.tab === "favourites") {
      setTab(router.query.tab);
      if (typeof window !== "undefined") {
        async function getFavourites() {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "https://otaq-api.onrender.com/places/get/favourites?complete=true",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
          const data = await response.json();
          setFavourites(data);
        }
        getFavourites();
      }
    }
  }, [router.isReady, router.asPath]);

  const handleChange = async () => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://otaq-api.onrender.com/auth/userupdate",
        {
          body: JSON.stringify({
            name: userSetting.name,
            email: userSetting.email,
            password: userSetting.password,
          }),
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.ok) {
        const data = response.json();
      }
    }
  };

  function getTotalRent(order) {
    console.log(order, 'order')
    const room = [
      order.place.roomOne,
      order.place.roomTwo,
      order.place.roomThree,
    ].filter((room) => room.name === order.roomType);

    let date1 = new Date(order.startDate);
    date1.setMinutes(date1.getMinutes() - date1.getTimezoneOffset());

    let date2 = new Date(order.lastDate);
    date2.setMinutes(date2.getMinutes() - date2.getTimezoneOffset());

    const millisecondsPerDay = 24 * 60 * 60 * 1000;
    const days = (date2 - date1) / millisecondsPerDay;

    return room[0].price * days;
  }

  return (
    <>
      <div className={styles["admin--panel--container"]}>
        <div className={styles["admin--options"]}>
          <h2 style={{ cursor: "pointer" }} onClick={() => router.push("/")}>
            Otaq
          </h2>
          <h4>User Dashboard</h4>
        </div>
        <div className={styles["admin--panel"]}>
          <div className={styles["admin--sidebar"]}>
            <button
              className={
                tab === "dashboard" ? styles["active"] : "default-button"
              }
              onClick={() => {
                router.push({
                  pathname: "/user/dashboard",
                });
              }}
            >
              Dashboard
            </button>
            <button
              className={
                tab === "bookedPlaces" ? styles["active"] : "default-button"
              }
              onClick={() => {
                router.push({
                  pathname: "/user/dashboard",
                  query: { tab: "bookedPlaces" },
                });
              }}
            >
              Booked Places
            </button>
            <button
              className={
                tab === "favourites" ? styles["active"] : "default-button"
              }
              onClick={() => {
                router.push({
                  pathname: "/user/dashboard",
                  query: { tab: "favourites" },
                });
              }}
            >
              Favourites
            </button>
            <button
              className={
                tab === "listedPlaces" ? styles["active"] : "default-button"
              }
              onClick={() => {
                router.push({
                  pathname: "/user/dashboard",
                  query: { tab: "listedPlaces" },
                });
              }}
            >
              Listed Places
            </button>
            <button
              className={
                tab === "settings" ? styles["active"] : "default-button"
              }
              onClick={() => {
                router.push({
                  pathname: "/user/dashboard",
                  query: { tab: "settings" },
                });
              }}
            >
              Settings
            </button>
          </div>

          <div className={styles.content_container}>
            {tab === "settings" ? (
              <div className={styles.card_main_container}>
                <div className={styles["section-top--card"]}>
                  <h2>Settings</h2>
                </div>
                <div className={styles["settings"]}>
                  <div className={styles["settings--container"]}>
                    <input
                      type="text"
                      onChange={(e) =>
                        setUserSetting({ ...userSetting, name: e.target.value })
                      }
                      value={userSetting.name}
                      placeholder="Change Name"
                    />
                    <input
                      type="text"
                      onChange={(e) =>
                        setUserSetting({
                          ...userSetting,
                          email: e.target.value,
                        })
                      }
                      value={userSetting.email}
                      placeholder="Change Email"
                    />
                    <input
                      type="password"
                      onChange={(e) =>
                        setUserSetting({
                          ...userSetting,
                          password: e.target.value,
                        })
                      }
                      value={userSetting.password}
                      placeholder="Change Password"
                    />
                    <button className="pink-button" onClick={handleChange}>
                      Update
                    </button>
                  </div>
                </div>
              </div>
            ) : null}

            {tab === "listedPlaces" ? (
              <div className={styles.card_main_container}>
                <div className={styles["section-top--card"]}>
                  <h2>Listed Places</h2>
                </div>
                {listing.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-around",
                    }}
                  >
                    {listing.map((l) => {
                      return (
                        <div key={l._id.toString()} className={styles2.card}>
                          <div className={styles2.card__image_container}>
                            <Image
                              onClick={() => {
                                router.push(`/place/${l._id.toString()}`);
                              }}
                              src={l.roomOne.images[0].data}
                              width={300}
                              height={300}
                              alt=""
                            />
                          </div>

                          <div
                            className={styles2["card--details"]}
                            onClick={() => {
                              router.push(`/place/${l._id.toString()}`);
                            }}
                          >
                            <div className={styles2.col}>
                              <p className={styles2.card__name}>{l.name}</p>
                              <div className={styles2.card__price_container}>
                                <span className={styles2.card__price}>
                                  Rs{l.roomOne.price}
                                </span>
                                <span className={styles2.card__night}>
                                  /night
                                </span>
                              </div>
                            </div>
                            <div className="divider"></div>
                            <div className={styles2["card--info"]}>
                              <p className={styles2.card__distance}>
                                3000m elevation
                              </p>
                              <p className={styles2.card__date}>{l.roomType}</p>
                            </div>
                          </div>
                         <PopupForm updateListing={updateListing} buttonText="Edit" id={l._id} price={[l.roomOne.price, l.roomTwo.price, l.roomThree.price]} />
                        </div>
                      );
                    })}
                    
                  </div>
                ) : (
                  <h1>No Places Listed</h1>
                )}
              </div>
            ) : null}

            {tab === "favourites" ? (
              <div className={styles.card_main_container}>
                <div className={styles["section-top--card"]}>
                  <h2>Listed Places</h2>
                </div>
                {favourites.length > 0 ? (
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-around",
                    }}
                  >
                    {favourites.map((l) => {
                      return (
                        <div key={l._id.toString()} className={styles2.card}>
                          <div className={styles2.card__image_container}>
                            <Image
                              onClick={() => {
                                router.push(`/place/${l._id.toString()}`);
                              }}
                              src={l.roomThree.images[0].data}
                              width={300}
                              height={300}
                              alt=""
                            />
                          </div>

                          <div
                            className={styles2["card--details"]}
                            onClick={() => {
                              router.push(`/place/${l._id.toString()}`);
                            }}
                          >
                            <div className={styles2.col}>
                              <p className={styles2.card__name}>{l.name}</p>
                              <div className={styles2.card__price_container}>
                                <span className={styles2.card__price}>
                                  Rs{l.roomOne.price}
                                </span>
                                <span className={styles2.card__night}>
                                  /night
                                </span>
                              </div>
                            </div>
                            <div className="divider"></div>
                            <div className={styles2["card--info"]}>
                              <p className={styles2.card__distance}>
                                {l.description}
                              </p>
                              <p className={styles2.card__distance}>{l.city}</p>
                              <p className={styles2.card__date}>{l.roomType}</p>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <h1>No Favourite Places Found</h1>
                )}
              </div>
            ) : null}

            {tab === "dashboard" ? (
              <div className={styles.dashboard_cards}>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>2</h2>
                    <p>Total Places Purchased</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    onClick={() => {
                      router.push({
                        pathname: "/user/dashboard",
                        query: { tab: "bookedPlaces" },
                      });
                    }}
                  >
                    More Info
                  </div>
                </div>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>3000 Rs</h2>
                    <p>Total Amount Spent</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    onClick={() => {
                      router.push({
                        pathname: "/user/dashboard",
                        query: { tab: "bookedPlaces" },
                      });
                    }}
                  >
                    More Info
                  </div>
                </div>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>0</h2>
                    <p>Places Listed</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    onClick={() => {
                      router.push({
                        pathname: "/user/dashboard",
                        query: { tab: "listedPlaces" },
                      });
                    }}
                  >
                    More Info
                  </div>
                </div>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>10000 Rs</h2>
                    <p>Amount Earned</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    // onClick={() => setTab("orders")}
                  >
                    More Info
                  </div>
                </div>
              </div>
            ) : null}
            {tab === "bookedPlaces" ? (
              <div className={styles.card_main_container}>
                <div className={styles["section-top--card"]}>
                  <h2>
                    Total Amount Spent:{" "}
                    {booking
                      ? booking.reduce(
                          (accumulator, currentValue) =>
                            accumulator + getTotalRent(currentValue),
                          0
                        )
                      : 0}
                  </h2>
                </div>
                <div className={styles["section-top--card"]}>
                  <h2>Total Orders: {booking ? booking.length : 0}</h2>
                </div>
                <div>
                  <Table
                    getTotalRent={getTotalRent}
                    tableData={booking}
                    tableHeadings={[
                      "Id:",
                      "Booked by:",
                      "Email:",
                      "Place:",
                      "Payment:",
                      "Status:",
                    ]}
                    type="orders"
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
