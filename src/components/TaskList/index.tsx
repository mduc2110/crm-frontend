import React, { useEffect, useState } from "react";
import classes from "./taskList.module.css";
import Table from "../UI/Table";
import { useLocation } from "react-router-dom";
import taskApi from "../../api/taskApi";
import { Link } from "react-router-dom";
import { TaskState } from "../../types";

const TaskList = () => {
   const location = useLocation();
   const [taskList, setTaskList] = useState<TaskState[]>([]);
   useEffect(() => {
      const fetchTask = async () => {
         const response = await taskApi.getAll(location.search);
         setTaskList(response.data.results);
         // console.log(response.data);
      };
      fetchTask();
   }, [location.search]);

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
               {taskList?.map((task, index) => {
                  return (
                     <tr key={index}>
                        <td>
                           <input type="checkbox" data-id={task.id} />
                        </td>
                        <td>{index + 1}</td>
                        <td>
                           <Link to={"/task/" + task.id}>{task.taskName}</Link>
                        </td>
                        <td>{task.taskType.nameType}</td>
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
