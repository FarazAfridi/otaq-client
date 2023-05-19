import TableRows from "../tableRows/tableRows";
import styles from "@/styles/admin.module.css";

export default function Table (props) {

return ( 
  <>
    <div className={styles["table-top"]}>
    {props.tableHeadings.map((th, i) =>  <span key={i}>{th}</span>)}
     
    </div>
         { props.type === 'orders' ? props.tableData.map((order) => (
        <TableRows
          key={order._id}
          id={order._id}
          tableRows={[order._id,order.user.name ,order.user.email, order.place.name, order.place.price]}
        />
      )) : props.type === 'users' ? props.tableData.map((user) => (
        <TableRows
          key={user._id}
          id={user._id}
          tableRows={[user._id, user.name, user.email, user.role]}
        />
      )) : null}
      </>
)
         }