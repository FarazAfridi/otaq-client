import { useEffect, useState } from "react";
import styles from "@/styles/admin.module.css";
import Table from "@/components/table/tableComponent";
import { useRouter } from "next/router";
import PlaceApprovalContainer from "@/components/placeApprovalContainer/placeApprovalContainer";
import { toast } from "react-toastify";
import ListingForm from "@/components/listingForm/listingForm";

export default function Admin() {
  const router = useRouter();

  const [tab, setTab] = useState("");
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
    if (!router.isReady) return;
    if (!router.query.tab || !router.query) {
      setTab("dashboard");
    } else if (router.query.tab === "users") {
      console.log("users");
      setTab(router.query.tab);
      function getUserCount(users, userRole) {
        const filteredUsers = users.filter((user) => user.role === userRole);
        const count = filteredUsers.length;
        return count;
      }

      async function getUsers() {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "https://otaq-api.onrender.com/auth/users",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
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
      getUsers();
    } else if (router.query.tab === "places") {
      setTab(router.query.tab);
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
      getPlaces();
    } else if (router.query.tab === "unapprovedPlaces") {
      setTab(router.query.tab);
      async function getUnapprovedPlaces() {
        if (typeof window !== "undefined") {
          const token = localStorage.getItem("token");
          const response = await fetch(
            "http://localhost:4000/places/get/unapproved",
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
      getUnapprovedPlaces();
    } else if (router.query.tab === "orders") {
      setTab(router.query.tab);
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
    } else if (router.query.tab === "listingForm") {
      setTab(router.query.tab);
     
    }
  }, [router.isReady, router.asPath]);

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

        if(response.status === 401) {
          toast("Session expired, Please login again", { hideProgressBar: true, autoClose: 2000, type: 'error' })
          localStorage.removeItem("token");
          router.push("/login")
          return
        }
        const data = await response.json();
        
        setDataCount({
          usersCount: data.users,
          unapprovedPlaceCount: data.unapprovedPlaces,
          ordersCount: data.orders,
          placesCount: data.places,
        });
      }
      getCount();
    }
  }, [tab]);

  function getTotalRent(order) {
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
          <h4>Admin Panel</h4>
        </div>
        <div className={styles["admin--panel"]}>
          <div className={styles["admin--sidebar"]}>
            <button
              className={
                tab === "dashboard" ? styles["active"] : "default-button"
              }
              onClick={() =>
                router.push({
                  pathname: "/admin",
                })
              }
            >
              Dashboard
            </button>
            <button
              className={tab === "orders" ? styles["active"] : "default-button"}
              onClick={() =>
                router.push({
                  pathname: "/admin",
                  query: { tab: "orders" },
                })
              }
            >
              Orders
            </button>
            <button
              className={tab === "listingForm" ? styles["active"] : "default-button"}
              onClick={() =>
                router.push({
                  pathname: "/admin",
                  query: { tab: "listingForm" },
                })
              }
            >
              Listing Form
            </button>
            <button
              className={
                tab === "unapprovedPlaces" ? styles["active"] : "default-button"
              }
              onClick={() => {
                router.push({
                  pathname: "/admin",
                  query: { tab: "unapprovedPlaces" },
                });
              }}
            >
              Unapproved Places
            </button>
            <button
              className={tab === "places" ? styles["active"] : "default-button"}
              onClick={() =>
                router.push({
                  pathname: "/admin",
                  query: { tab: "places" },
                })
              }
            >
              Places
            </button>
            <button
              className={tab === "users" ? styles["active"] : "default-button"}
              onClick={() =>
                router.push({
                  pathname: "/admin",
                  query: { tab: "users" },
                })
              }
            >
              Users
            </button>
          </div>

          <div className={styles.content_container}>
            {/* ORDERS */}
            {tab === "orders" ? (
              <>
                <div className={styles["section-top--card"]}>
                  <h2>
                    Total Revenue: {orders
                      ? orders.reduce(
                          (accumulator, currentValue) =>
                            accumulator + getTotalRent(currentValue),
                          0
                        )
                      : 0}
                  </h2>
                </div>
                <div className={styles["section-top--card"]}>
                  <h2>Total Orders: {orders ? orders.length : 0}</h2>
                </div>

                <Table
                  tableData={orders}
                  getTotalRent={getTotalRent}
                  tableHeadings={[
                    "Id:",
                    "Booked by:",
                    "Email:",
                    "Place:",
                    "Payment:",
                    "Status",
                  ]}
                  type="orders"
                />
              </>
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
                    onClick={() =>
                      router.push({
                        pathname: "/admin",
                        query: { tab: "users" },
                      })
                    }
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
                      router.push({
                        pathname: "/admin",
                        query: { tab: "places" },
                      });
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
                    onClick={() =>
                      router.push({
                        pathname: "/admin",
                        query: { tab: "unapprovedPlaces" },
                      })
                    }
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
                    onClick={() =>
                      router.push({
                        pathname: "/admin",
                        query: { tab: "orders" },
                      })
                    }
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
            ) : tab === "listingForm" ? (
              <ListingForm />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
}
