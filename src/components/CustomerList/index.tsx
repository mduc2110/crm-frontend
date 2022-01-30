import { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCustomer, getCustomer } from "../../actions/customerAction";
import { useAppSelector } from "../../store";
import { CustomerState } from "../../store/types";
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
   // const [customerList2, setCustomerList2] = useState<CustomerState[]>([]);
   const customerList: CustomerState[] = useAppSelector((state) => state.customer);
   console.log(customerList);

   const navigate = useNavigate();
   const location = useLocation();

   const dispatch = useDispatch();
   useEffect(() => {
      // const fetchUser = async () => {
      //    const response = await fetch("https://jsonplaceholder.typicode.com/users");
      //    const userData = await response.json();
      //    setCustomerList2(userData);
      // };

      // fetchUser();
      dispatch(getCustomer());
      // dispatch(getCustomer("?page=1&limit=10"));
   }, [dispatch]);
   const editCustomerHandler = (id: string) => {
      navigate({
         pathname: location.pathname,
         search: `?id=${id}`,
      });
   };
   const deleteCustomerHandler = (id: string) => {
      dispatch(deleteCustomer([id]));
   };
   return (
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
                     <td>{customer.customerName}</td>
                     <td>{customer.email}</td>
                     <td>Khách hàng mới</td>
                     <td>Hoạt động</td>
                     <td>
                        <IconButton
                           onClick={() => editCustomerHandler(customer.id)}
                           iconComponent={<AiOutlineEdit />}
                        />
                        <IconButton
                           onClick={() => deleteCustomerHandler(customer.id)}
                           iconComponent={<AiOutlineDelete />}
                           color="red"
                        />
                     </td>
                  </tr>
               );
            })}
         </tbody>
      </Table>
   );
};

export default CustomerList;
