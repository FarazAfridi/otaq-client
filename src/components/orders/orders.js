import Order from "../order/order";
import styles from "@/styles/admin.module.css";

export default function Orders (props) {

return ( 
  <>
    <div className={styles["order-top"]}>
    {props.tableHeadings.map((th, i) =>  <span key={i}>{th}</span>)}
     
    </div>
         { props.type === 'orders' ? props.orders.map((order) => (
        <Order
          key={order._id}
          id={order._id}
          tableRows={[order._id,order.user.name ,order.user.email, order.place.name, order.place.price]}
        />
      )) : props.type === 'users' ? props.orders.map((order) => (
        <Order
          key={order._id}
          id={order._id}
          tableRows={[order._id, order.name, order.email, order.role]}
        />
      )) : null}
      </>
)
         }