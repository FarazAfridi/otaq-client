import { useState } from "react";
import TableRows from "../tableRows/tableRows";
import styles from "@/styles/admin.module.css";

export default function Table(props) {

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
      <div className={styles["table-top"]}>
        {props.tableHeadings.map((th, i) => (
          <span key={i}>{th}</span>
        ))}
      </div>
      {props.type === "orders"
        ? props.tableData.map((order) => (
          
            <TableRows
              key={order._id}
              id={order._id}
              tableRows={[
                order && order._id,
                order && order.user && order.user.name,
                order && order.user && order.user.email,
                order && order.place && order.place.name,
                order && order.place && getTotalRent(order),
                order && order
              ]}
            />
          ))
        : props.type === "users"
        ? props.tableData.map((user) => (
            <TableRows
              key={user._id}
              id={user._id}
              tableRows={[user._id, user.name, user.email, user.role]}
            />
          ))
        : null}
    </>
  );
}
