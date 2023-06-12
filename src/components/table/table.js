import TableRows from "../tableRows/tableRows";
import styles from "@/styles/admin.module.css";

export default function Table (props) {
  console.log(props)

return ( 
  <>
    <div className={styles["table-top"]}>
    {props.tableHeadings.map((th, i) =>  <span key={i}>{th}</span>)}
     
    </div>
         { props.type === 'orders' ? props.tableData.map((order) => (
        <TableRows
          key={order._id}
          id={order._id}
          tableRows={[order && order._id, order && order.user && order.user.name , order && order.user && order.user.email, order && order.place && order.place.name, order && order.place && order.place.price]}
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