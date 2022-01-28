import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import IconButton from "../UI/IconButton";
import Table from "../UI/Table";
import classes from "./customer.module.css";
interface CustomerTest {
   name: string;
   email: string;
   address: string;
}
interface TTT {
   id: string;
   name: string;
   username: string;
   email: string;
   address: {
      street: string;
      suite: string;
      city: string;
      zipcode: string;
      geo: {
         lat: string;
         lng: string;
      };
   };
   phone: string;
   website: string;
   company: {
      name: string;
      catchPhrase: string;
      bs: string;
   };
}

const CustomerList = () => {
   const [customerList, setCustomerList] = useState<TTT[]>([]);
   const navigate = useNavigate();
   const location = useLocation();
   useEffect(() => {
      const fetchUser = async () => {
         const response = await fetch("https://jsonplaceholder.typicode.com/users");
         const userData = await response.json();
         setCustomerList(userData);
      };

      fetchUser();
   }, []);
   const editCustomerHandler = (id: string) => {
      navigate({
         pathname: location.pathname,
         search: `?id=${id}`,
      });
   };
   return (
      <div>
         <Table>
            <thead>
               <tr>
                  <th>
                     <input type="checkbox" />
                  </th>
                  <th>STT</th>
                  <th>Họ và tên</th>
                  <th>Email</th>
                  <th>Loại KH</th>
                  <th>Trạng thái</th>
                  <th className={classes.actions}>Hành động</th>
               </tr>
            </thead>
            <tbody>
               {customerList?.map((customer, index) => {
                  return (
                     <tr key={index}>
                        <td>
                           <input type="checkbox" data-id={customer.id} />
                        </td>
                        <td>{index + 1}</td>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>Khách hàng mới</td>
                        <td>Hoạt động</td>
                        <td>
                           <IconButton
                              onClick={() => editCustomerHandler(customer.id)}
                              iconComponent={<AiOutlineEdit />}
                           />
                           <IconButton iconComponent={<AiOutlineDelete />} color="red" />
                        </td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </div>
   );
};

export default CustomerList;
