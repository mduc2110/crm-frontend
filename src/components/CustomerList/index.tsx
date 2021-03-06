import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteCustomer, getCustomer } from "../../actions/customerAction";
import { useAppSelector } from "../../store";
import { CustomerState } from "../../store/types";
import IconButton from "../UI/IconButton";
import Table from "../UI/Table";
import classes from "./customer.module.css";

import Swal from "sweetalert2";
import Skeleton from "react-loading-skeleton";

const CustomerList: React.FC<{
   onSetIdCustomerList: (e: ChangeEvent<HTMLInputElement>) => void;
   refreshCustomerCheckList: () => void;
   onShowModal: () => void;
}> = (props) => {
   // const [customerList2, setCustomerList2] = useState<CustomerState[]>([]);
   const customerList: CustomerState[] = useAppSelector((state) => state.customer);
   const [isFetchingData, setIsFetchingData] = useState<boolean>(true);

   const navigate = useNavigate();
   const location = useLocation();

   const dispatch = useDispatch();

   useEffect(() => {
      setIsFetchingData(true);
      dispatch(getCustomer(location.search));

      setIsFetchingData(false);
      // dispatch(getCustomer("?page=1&limit=10"));
   }, [dispatch, location]);
   const editCustomerHandler = (id: string) => {
      props.onShowModal();
      navigate({
         pathname: location.pathname,
         search: `?id=${id}&edit=T`,
      });
   };
   const deleteCustomerHandler = (id: string) => {
      Swal.fire({
         // title: "Are you sure?",
         text: "Bạn sẽ không thể hoàn tác",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3e4a92",
         cancelButtonColor: "#d33",
         confirmButtonText: "Xóa",
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(deleteCustomer([id]));
            props.refreshCustomerCheckList();
            Swal.fire("Deleted!", "Xóa thành công.", "success");
         }
      });
   };

   return (
      <div className={classes.customerList}>
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
               {isFetchingData ? (
                  <tr>
                     <td>
                        <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                     </td>
                     <td>
                        <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                     </td>
                     <td>
                        <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                     </td>
                     <td>
                        <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                     </td>
                     <td>
                        <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                     </td>
                     <td>
                        <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                     </td>
                     <td>
                        <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                     </td>
                  </tr>
               ) : null}

               {!isFetchingData &&
                  customerList?.map((customer, index) => {
                     return (
                        <tr key={customer.id + "_" + index}>
                           <td>
                              <input type="checkbox" value={customer.id} data-email={customer.email} onChange={(e) => props.onSetIdCustomerList(e)} />
                           </td>
                           <td>{index + 1}</td>
                           <td>{customer.customerName}</td>
                           <td>{customer.email}</td>
                           <td>{customer.customerstatus.status}</td>
                           <td>{customer.customertag.tagName}</td>
                           <td>
                              <IconButton onClick={() => editCustomerHandler(customer.id)} iconComponent={<AiOutlineEdit />} />
                              <IconButton onClick={() => deleteCustomerHandler("" + customer.id)} iconComponent={<AiOutlineDelete />} color="red" />
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
