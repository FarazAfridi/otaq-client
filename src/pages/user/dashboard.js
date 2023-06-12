import { useEffect, useRef, useState } from "react";
import styles from "@/styles/admin.module.css";
import Table from "@/components/table/table";
// import Table from "@/components/table/table";
// import PlaceApprovalContainer from "@/components/placeApprovalContainer/placeApprovalContainer";

export default function Dashboard() {
  const [tab, setTab] = useState("dashboard");
  const [booking, setBooking] = useState([]);

  const [userSetting, setUserSetting] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = async () => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://otaq-api.onrender.com/auth/userupdate",
          {
            body: JSON.stringify({name: userSetting.name, email: userSetting.email, password: userSetting.password}),
            method: 'POST',
            headers: {
              'Content-Type' : 'application/json',
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if(response.ok) {
          const data = response.json();
          console.log(data)
        }
      }
      
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      async function getUserBookings() {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "https://otaq-api.onrender.com/places/get/booking",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setBooking(data);
      }
      getUserBookings();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      async function getUserData() {
        const token = localStorage.getItem("token");
        const response = await fetch("https://otaq-api.onrender.com/auth/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserSetting({
          name: data[0].name,
          email: data[0].email,
          password: "",
        });
      }
      getUserData();
    }
  }, []);

  return (
    <>
      <div className={styles["admin--panel--container"]}>
        <div className={styles["admin--options"]}>
          <h2>Otaq</h2>
          <h4>User Dashboard</h4>
        </div>
        <div className={styles["admin--panel"]}>
          <div className={styles["admin--sidebar"]}>
            <button
              className="default-button"
              onClick={() => {
                setTab("dashboard");
              }}
            >
              Dashboard
            </button>
            <button
              className="default-button"
              onClick={() => {
                setTab("bookedPlaces");
              }}
            >
              Booked Places
            </button>
            <button
              className="default-button"
              onClick={() => {
                setTab("listedPlaces");
              }}
            >
              Listed Places
            </button>
            <button
              className="default-button"
              onClick={() => {
                setTab("settings");
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
                <div>
                  <input
                    type="text"
                    onChange={(e) => setUserSetting({...userSetting, name: e.target.value })}
                    value={userSetting.name}
                  />
                  <input
                    type="text"
                    onChange={(e) => setUserSetting({...userSetting, email: e.target.value })}
                    value={userSetting.email}
                  />
                  <input
                    type="password"
                    onChange={(e) =>
                      setUserSetting({...userSetting, password: e.target.value })
                    }
                    value={userSetting.password}
                    placeholder="Change Password"
                  />
                  <button onClick={handleChange}>Update</button>
                </div>
              </div>
            ) : null}

            {tab === "listedPlaces" ? (
              <div className={styles.card_main_container}>
                <div className={styles["section-top--card"]}>
                  <h2>Listed Places</h2>
                </div>
              </div>
            ) : tab === "dashboard" ? (
              <div className={styles.dashboard_cards}>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>2</h2>
                    <p>Total Places Purchased</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    onClick={() => {
                      setTab("bookedPlaces");
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
                      setTab("bookedPlaces");
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
                      setTab("listedPlaces");
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
            ) : tab === "bookedPlaces" ? (
              <div className={styles.card_main_container}>
                <div className={styles["section-top--card"]}>
                  <h2>Booked Places</h2>
                </div>
                <div>
                  <Table
                    tableData={booking}
                    tableHeadings={[
                      "Id:",
                      "Booked by:",
                      "Email:",
                      "Place:",
                      "Payment:",
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