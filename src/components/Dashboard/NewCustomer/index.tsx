import React, { useEffect, useState } from "react";
import { CustomerState } from "../../../store/types";
import Table from "../../UI/Table";
import customerApi from "../../../api/customerApi";
import Skeleton from "react-loading-skeleton";
import { AiOutlineDatabase } from "react-icons/ai";

const NewCustomer = () => {
   const [customerList, setCustomerList] = useState<CustomerState[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   useEffect(() => {
      const fetchCustomer = async () => {
         const response = await customerApi.getAll("?limit=10");
         setCustomerList(response.data.results);
         setIsLoading(false);
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
               {isLoading && (
                  <tr>
                     <td>
                        <Skeleton
                           count={10}
                           height="25px"
                           width="20px"
                           style={{ marginTop: "10px" }}
                        />
                     </td>
                     <td>
                        <Skeleton
                           count={10}
                           height="25px"
                           width="80px"
                           style={{ marginTop: "10px" }}
                        />
                     </td>
                     <td>
                        <Skeleton
                           count={10}
                           height="25px"
                           width="200px"
                           style={{ marginTop: "10px" }}
                        />
                     </td>
                  </tr>
               )}
               {isLoading === false && customerList.length === 0 && (
                  <tr>
                     <td></td>
                     <td>
                        <div className="noData">
                           <AiOutlineDatabase />
                           <span>No data found</span>
                        </div>
                     </td>
                     <td></td>
                  </tr>
               )}
               {!isLoading &&
                  customerList?.map((customer, index) => {
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
