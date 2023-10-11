import { useRouter } from "next/router";
// import styles from "./tableRows.module.css";
import { toast } from "react-toastify";

export default function TableRows(props) {
  const router = useRouter();

  const handleOrderStatus = async (value) => {
    if (value === "Approved") {
      const id = props.tableRows[5]._id;
      if (id) {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:4000/approve/order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            id,
          }),
        });
        const data = await response.json();
        toast(data, {
          hideProgressBar: true,
          autoClose: 2000,
          type: "success",
        });
      } else {
        console.log("could not find id");
      }
    } else if (value === "Rejected") {
      const id = props.tableRows[5]._id;
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:4000/places/reject/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          id,
        }),
      });
      const data = await response.json();
      toast(data, {
        hideProgressBar: true,
        autoClose: 2000,
        type: "success",
      });
    }
  };

  return (
    <div className={styles["table"]} key={props.id}>
      {props.tableRows.map((tr, i) => (
        <p key={i} className={styles["table-item"]}>
          {typeof tr === "object" ? (
            <select
              onChange={(e) => handleOrderStatus(e.target.value)}
              disabled={router.pathname === '/user/dashboard' ? true : tr.status !== "Pending"}
            >
              {["Approved", "Pending", "Rejected"].map((status, i) => (
                <option selected={tr.status === status} key={i} value={status}>
                  {status}
                </option>
              ))}
            </select>
          ) : (
            tr
          )}
        </p>
      ))}
    </div>
  );
}
