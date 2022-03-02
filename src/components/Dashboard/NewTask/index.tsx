import React, { useEffect, useState } from "react";
import { TaskState } from "../../../store/types";
import Table from "../../UI/Table";
import taskApi from "../../../api/taskApi";

const oneLineStyle = {
   "text-align" : "left",
    "-webkit-line-clamp" : "1",
    "overflow" : "hidden",
    "display" : "-webkit-box",
    "-webkit-box-orient" : "vertical",
    "width": "300px"
}

const NewTask = () => {
   const [taskList, setTaskList] = useState<TaskState[]>([]);
   useEffect(() => {
      const fetchCustomer = async () => {
         const response = await taskApi.getAll("?limit=10");
         setTaskList(response.data.results);
      };
      fetchCustomer();
   }, []);
   
  return (
   <>
   <h3>Công việc gần đây</h3>
   <Table>
      <thead>
         <tr>
            <th>STT</th>
            <th style={{ textAlign: "left" }}>Họ và tên</th>
            <th style={{ textAlign: "left" }}>Email</th>
         </tr>
      </thead>
      <tbody>
         {taskList?.map((task, index) => {
            return (
               <tr key={index}>
                  <td>{index + 1}</td>
                  <td style={oneLineStyle}>{task.taskName}</td>
                  <td style={{ textAlign: "left" }}>{task.tasktype.nameType}</td>
               </tr>
            );
         })}
      </tbody>
   </Table>
</>
  )
}

export default NewTask;
