import React, { useEffect, useState } from "react";
import Panel from "../UI/Panel";
import { useNavigate, useParams } from "react-router-dom";
import taskApi from "../../api/taskApi";
import { TaskState } from "../../types";
import classes from "./taskDetail.module.css";
import moment from "moment";
import { AiOutlineArrowLeft } from "react-icons/ai";
const TaskDetail = () => {
   const { id } = useParams();
   const [task, setTask] = useState<TaskState>();
   const navigate = useNavigate();
   useEffect(() => {
      const getSingleTask = async () => {
         const response = await taskApi.getOne(id as string);
         console.log(response.data);
         setTask(response.data);
      };
      getSingleTask();
   }, [id]);
   const goBackHandler = () => {
      navigate(-1);
   };
   return (
      <>
         <span className="back-link" onClick={goBackHandler}>
            <AiOutlineArrowLeft /> Quay lại
         </span>
         <Panel className={classes.taskDetail}>
            <div>
               <span className={classes.title}>Ngày tạo: </span>
               <span>
                  {task?.createdAt ?? moment("2022-02-02T11:57:59.000Z").format("DD-MM-YYYY")}
               </span>
            </div>
            <div>
               <span className={classes.title}>Nhân viên phụ trách: </span>
               <span>{task?.user.name}</span>
            </div>
            <div>
               <span className={classes.title}>Tên khách hàng: </span>
               <span>{task?.customer.customerName}</span>
            </div>
            <div>
               <span className={classes.title}>Thời gian bắt đầu: </span>
               <span>{task?.startTime}</span>
            </div>
            <div>
               <span className={classes.title}>Thời gian kết thúc: </span>
               <span>{task?.endTime}</span>
            </div>
            <div>
               <span className={classes.title}>Nội dung công việc: </span>
               <span>{task?.taskDescription}</span>
            </div>
            <div>
               <span className={classes.title}>Tiêu đề: </span>
               <span>{task?.taskName}</span>
            </div>
         </Panel>
      </>
   );
};

export default TaskDetail;
