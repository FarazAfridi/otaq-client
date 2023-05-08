import styles from "./order.module.css";

export default function Order(props) {
  return (
    <div className={styles["order-table"]} key={props.id}>
      {props.tableRows.map((tr, i) => <p key={i} className={styles["order-item"]}>{tr}</p>)}
    </div>
  );
}
