import React, { useEffect, useState } from "react";
import { CustomerState } from "../../../store/types";
import Table from "../../UI/Table";
import customerApi from "../../../api/customerApi";

const NewCustomer = () => {
   const [customerList, setCustomerList] = useState<CustomerState[]>([]);
   useEffect(() => {
      const fetchCustomer = async () => {
         const response = await customerApi.getAll("?limit=10");
         setCustomerList(response.data.results);
      };
      fetchCustomer();
   }, []);
   return (
      <>
         <h3>Khách hàng mới nhất</h3>
         <Table>
            <thead>
               <tr>
                  <th>STT</th>
                  <th style={{ textAlign: "left" }}>Họ và tên</th>
                  <th style={{ textAlign: "left" }}>Email</th>
               </tr>
            </thead>
            <tbody>
               {customerList?.map((customer, index) => {
                  return (
                     <tr key={index}>
                        <td>{index + 1}</td>
                        <td style={{ textAlign: "left" }}>{customer.customerName}</td>
                        <td style={{ textAlign: "left" }}>{customer.email}</td>
                     </tr>
                  );
               })}
            </tbody>
         </Table>
      </>
   );
};

export default NewCustomer;
