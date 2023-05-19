import styles from "./tableRows.module.css";

export default function TableRows(props) {
  return (
    <div className={styles["table"]} key={props.id}>
      {props.tableRows.map((tr, i) => <p key={i} className={styles["table-item"]}>{tr}</p>)}
    </div>
  );
}
