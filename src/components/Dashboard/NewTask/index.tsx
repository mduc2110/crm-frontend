import React, { useEffect, useState } from "react";
import { AuthState, TaskState } from "../../../store/types";
import Table from "../../UI/Table";
import taskApi from "../../../api/taskApi";
import { AiOutlineDatabase } from "react-icons/ai";
import { useAppSelector } from "../../../store";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const NewTask = () => {
   const [taskList, setTaskList] = useState<TaskState[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(true);
   const auth: AuthState = useAppSelector((state) => state.auth);
   useEffect(() => {
      const fetchCustomer = async () => {
         const response = await taskApi.getAll("?limit=10&userId=" + auth.user?.id);
         setTaskList(response.data.results);
         setIsLoading(false);
      };
      fetchCustomer();
   }, []);

   return (
      <>
         <h3>Công việc của tôi</h3>
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
               {isLoading === false && taskList.length === 0 && (
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
                  taskList?.map((task, index) => {
                     return (
                        <tr key={index}>
                           <td>{index + 1}</td>
                           <td
                              style={{
                                 textAlign: "left",
                                 overflow: "hidden",
                                 width: "300px",
                                 textOverflow: "ellipsis",
                              }}
                           >
                              <Link to={"/task/" + task.id}>{task.taskName}</Link>
                           </td>
                           <td style={{ textAlign: "left" }}>{task.tasktype.nameType}</td>
                        </tr>
                     );
                  })}
            </tbody>
         </Table>
      </>
   );
};

export default NewTask;
