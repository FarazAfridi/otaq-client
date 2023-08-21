import TableRows from "../tableRows/tableRows";
import styles from "./tableComponent.module.css";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

export default function TableComponent(props) {

  const router = useRouter()

  const handleOrderStatus = async (value, order) => {
    if (value === "Approved") {
      const id = order._id;
      if (id) {
        const token = localStorage.getItem("token");
        const response = await fetch("https://otaq-api.azurewebsites.net/places/approve/order", {
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
      const id = order._id
      const token = localStorage.getItem("token");
      const response = await fetch("https://otaq-api.azurewebsites.net/places/reject/order", {
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
    <>
    <Table>
      <Thead>
        <Tr>
      {props.tableHeadings.map((th, i) =>  <Th key={i}>{th}</Th>)}

      </Tr>
      </Thead>
      <Tbody >
        {props.type === 'users' ? props.tableData.map((user, i) => <Tr  key={i}>
          <Td className={styles['table-item']}>{user._id}</Td>
          <Td className={styles['table-item']}>{user.name}</Td>
          <Td className={styles['table-item']}>{user.email}</Td>
          <Td className={styles['table-item']}>{user.role}</Td>
        </Tr>) : props.type === 'orders' ? props.tableData.map((order) => <Tr key={order._id}>
          <Td className={styles['table-item']}>{order._id}</Td>
          <Td className={styles['table-item']}>{order.user.name}</Td>
          <Td className={styles['table-item']}>{order.user.email}</Td>
          <Td className={styles['table-item']}>{order.place.name}</Td>
          <Td className={styles['table-item']}>{props.getTotalRent(order)}</Td>
          <Td className={styles['table-item']}>{<select
              onChange={(e) => handleOrderStatus(e.target.value, order)}
              disabled={router.pathname === '/user/dashboard' ? true : order.status !== "Pending"}
            >
              {["Approved", "Pending", "Rejected"].map((status, i) => (
                <option selected={order.status === status} key={i} value={status}>
                  {status}
                </option>
              ))}
            </select>}</Td>
        </Tr>) : null}
      </Tbody>
      </Table>
      {/* {props.type === "orders"
        ? props.tableData.map((order) => {
         return ( <TableRows
              key={order._id}
              id={order._id}
              tableRows={[
                order && order._id,
                order && order.user && order.user.name,
                order && order.user && order.user.email,
                order && order.place && order.place.name,
                order && order.place && props.getTotalRent(order),
                order && order
              ]}
            />
          )})
        : props.type === "users"
        ? props.tableData.map((user) => (
            <TableRows
              key={user._id}
              id={user._id}
              tableRows={[user._id, user.name, user.email, user.role]}
            />
          ))
        : null} */}
    </>
  );
}
