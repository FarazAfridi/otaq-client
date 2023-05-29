import { useEffect, useState } from "react";
import styles from "@/styles/admin.module.css";
// import Table from "@/components/table/table";
// import PlaceApprovalContainer from "@/components/placeApprovalContainer/placeApprovalContainer";

export default function Dashboard() {
  const [tab, setTab] = useState("dashboard");

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
              </div>
            ): null}

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
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
