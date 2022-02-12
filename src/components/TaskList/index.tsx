import React, { useEffect, useState } from "react";
import classes from "./taskList.module.css";
import Table from "../UI/Table";
import { useLocation } from "react-router-dom";
import taskApi from "../../api/taskApi";
import { Link } from "react-router-dom";
import { TaskState } from "../../types";
import Skeleton from "react-loading-skeleton";

const TaskList: React.FC<{ isFetching: boolean; setIsFetching: () => void }> = (props) => {
   const location = useLocation();
   const [taskList, setTaskList] = useState<TaskState[]>([]);
   const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
   useEffect(() => {
      let isMounted = true;
      setIsFetchingData(true);
      const fetchTask = async () => {
         const response = await taskApi.getAll(location.search);
         if (isMounted) {
            setTaskList(response.data.results);
            props.setIsFetching();

            setIsFetchingData(false);
         }
         return () => {
            isMounted = false;
         };
      };
      fetchTask();
   }, [location.search, props]);

   return (
      <div className={classes.taskList}>
         <Table>
            <thead>
               <tr>
                  <th>
                     <input type="checkbox" />
                  </th>
                  <th>STT</th>
                  <th>Công việc</th>
                  <th>Loại</th>
                  <th>Phụ trách</th>
                  <th>Trạng thái</th>
                  {/* <th className={classes.actions}>Hành động</th> */}
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
                  </tr>
               ) : null}
               {!isFetchingData &&
                  taskList?.map((task, index) => {
                     return (
                        <tr key={index}>
                           <td>
                              <input type="checkbox" data-id={task.id} />
                           </td>
                           <td>{index + 1}</td>
                           <td>
                              <Link to={"/task/" + task.id}>{task.taskName}</Link>
                           </td>
                           <td>{task.tasktype.nameType}</td>
                           <td>{task.user.name}</td>
                           <td>{task.status}</td>
                        </tr>
                     );
                  })}
            </tbody>
         </Table>
      </div>
   );
};

export default TaskList;
