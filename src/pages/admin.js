import { useEffect, useState } from "react";
import styles from "@/styles/admin.module.css";
import Table from "@/components/table/table";
import PlaceApprovalContainer from "@/components/placeApprovalContainer/placeApprovalContainer";

export default function Admin() {
  const [tab, setTab] = useState("dashboard");
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [places, setPlaces] = useState([]);
  const [unapprovedPlace, setUnapprovedPlace] = useState([]);
  const [userRoleCount, setUserRoleCount] = useState({
    admins: "0",
    vendors: "0",
    users: 0,
  });
  const [dataCount, setDataCount] = useState({
    ordersCount: 0,
    placesCount: 0,
    unapprovedPlaceCount: 0,
    usersCount: 0,
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      async function getCount() {
        const response = await fetch(
          "https://otaq-api.onrender.com/places/count",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setDataCount({
          usersCount: data.users,
          unapprovedPlaceCount: data.unapprovedPlaces,
          ordersCount: data.orders,
          placesCount: data.places,
        });
        console.log(data);
      }
      getCount();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      async function getOrders() {
        const response = await fetch(
          "https://otaq-api.onrender.com/places/book",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const data = await response.json();
        setOrders(data);
      }
      getOrders();
    }
  }, []);

  async function getUnapprovedPlaces() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://otaq-api.onrender.com/places/get/unapproved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setUnapprovedPlace(data);
    }
  }

  async function getUsers() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const response = await fetch("https://otaq-api.onrender.com/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      const adminCount = getUserCount(data, "Admin");
      const vendorCount = getUserCount(data, "Vendor");
      const userCount = getUserCount(data, "User");
      setUserRoleCount({
        admins: adminCount,
        vendors: vendorCount,
        users: userCount,
      });
      setUsers(data);
    }
  }

  function getUserCount(users, userRole) {
    const filteredUsers = users.filter((user) => user.role === userRole);
    const count = filteredUsers.length;
    return count;
  }

  async function getPlaces() {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      const response = await fetch(
        "https://otaq-api.onrender.com/places/get/approved",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setPlaces(data);
    }
  }

  return (
    <>
      <div className={styles["admin--panel--container"]}>
        <div className={styles["admin--options"]}>
          <h2>Otaq</h2>
          <h4>Admin Panel</h4>
        </div>
        <div className={styles["admin--panel"]}>
          <div className={styles["admin--sidebar"]}>
            <button
              className="default-button"
              onClick={() => {
                setTab("dashboard");
                getUnapprovedPlaces();
              }}
            >
              Dashboard
            </button>
            <button className="default-button" onClick={() => setTab("orders")}>
              Orders
            </button>
            <button
              className="default-button"
              onClick={() => {
                setTab("unapprovedPlaces");
                getUnapprovedPlaces();
              }}
            >
              Unapproved Places
            </button>
            <button
              className="default-button"
              onClick={() => {
                setTab("places");
                getPlaces();
              }}
            >
              Places
            </button>
            <button
              className="default-button"
              onClick={() => {
                setTab("users");
                getUsers();
              }}
            >
              Users
            </button>
          </div>

          <div className={styles.content_container}>
            {/* ORDERS */}
            {tab === "orders" ? (
              <Table
                tableData={orders}
                tableHeadings={[
                  "Id:",
                  "Booked by:",
                  "Email:",
                  "Place:",
                  "Payment:",
                ]}
                type="orders"
              />
            ) : null}
            {/* UNAPPROVED */}

            {tab === "unapprovedPlaces" ? (
              <div>
                <div className={styles.card_main_container}>
                  <div className={styles["section-top--card"]}>
                    <h2>
                      Total Unapproved Places: {dataCount.unapprovedPlaceCount}
                    </h2>
                  </div>
                </div>
                <div className={styles["unapproved-places"]}>
                  <PlaceApprovalContainer
                    approvedPlaces={false}
                    unapprovedPlace={unapprovedPlace}
                  />
                </div>
              </div>
            ) : tab === "users" ? (
              <div>
                <div className={styles.card_main_container}>
                  <div className={styles["section-top--card"]}>
                    <h2>Total Users: {userRoleCount.users}</h2>
                  </div>
                  <div className={styles["section-top--card"]}>
                    <h2>Total Vendors: {userRoleCount.vendors}</h2>
                  </div>
                  <div className={styles["section-top--card"]}>
                    <h2>Total Admins : {userRoleCount.admins}</h2>
                  </div>
                </div>
                <Table
                  tableData={users}
                  type="users"
                  tableHeadings={["Id", "Username", "Email", "Role"]}
                />
              </div>
            ) : tab === "dashboard" ? (
              <div className={styles.dashboard_cards}>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>{dataCount.usersCount}</h2>
                    <p>Total Users</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    onClick={() => {
                      setTab("users");
                      getUsers();
                    }}
                  >
                    More Info
                  </div>
                </div>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>{dataCount.placesCount}</h2>
                    <p>Total Places</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    onClick={() => {
                      setTab("places");
                      getPlaces();
                    }}
                  >
                    More Info
                  </div>
                </div>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>{dataCount.unapprovedPlaceCount}</h2>
                    <p>Total Unapproved Places</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    onClick={() => {
                      setTab("unapprovedPlaces");
                      getUnapprovedPlaces();
                    }}
                  >
                    More Info
                  </div>
                </div>
                <div className={styles.dashboard_card}>
                  <div className={styles.dashboard_card_upper_child}>
                    <h2>{dataCount.ordersCount}</h2>
                    <p>Total Orders</p>
                  </div>
                  <div
                    className={styles.dashboard_card_lower_child}
                    onClick={() => setTab("orders")}
                  >
                    More Info
                  </div>
                </div>
              </div>
            ) : tab === "places" ? (
              <div>
                <div className={styles.card_main_container}>
                  <div className={styles["section-top--card"]}>
                    <h2>Total Places Listed: {dataCount.placesCount}</h2>
                  </div>
                </div>

                <div className={styles["unapproved-places"]}>
                  <PlaceApprovalContainer
                    approvedPlaces={true}
                    unapprovedPlace={places}
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