import React, { useEffect, useState } from "react";
import Panel from "../UI/Panel";
import { useNavigate, useParams } from "react-router-dom";
import taskApi from "../../api/taskApi";
import classes from "./taskDetail.module.css";
import moment from "moment";
import "moment/locale/vi";
import { AiOutlineArrowLeft, AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import { TaskState } from "../../store/types";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { deleteTask } from "../../actions/taskAction";
import Swal from "sweetalert2";
const TaskDetail = () => {
   const { id } = useParams();
   const [task, setTask] = useState<TaskState>();
   const [isFetching, setIsFetching] = useState<boolean>(true);
   const navigate = useNavigate();
   const dispatch = useDispatch();
   useEffect(() => {
      setIsFetching(true);
      const getSingleTask = async () => {
         const response = await taskApi.getOne(id as string);
         setTask(response.data);
         setIsFetching(false);
      };
      getSingleTask();
   }, [id]);
   const goBackHandler = () => {
      navigate(-1);
   };
   const editTaskHandler = () => {
      navigate("/task?edit=T&id=" + id);
   };

   const deleteTaskhandler = () => {
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
            dispatch(deleteTask(id as string));
            navigate(-1);
            Swal.fire("Deleted!", "Xóa thành công.", "success");
         }
      });
   };

   return (
      <>
         <span className="back-link" onClick={goBackHandler}>
            <AiOutlineArrowLeft /> Quay lại
         </span>
         {!isFetching ? (
            <Panel className={classes.taskDetail}>
               <h2 className={classes.bigTitle}>
                  <AiOutlineEdit onClick={editTaskHandler} />
                  {task?.taskName}
               </h2>
               <div className={classes.detailBody}>
                  <div className={classes.left}>
                     <div className={classes.section}>
                        <h4 className={classes.titleBody}>Chi tiết công việc</h4>
                        <div className={classes.info}>
                           <span className={classes.title}>Thời gian bắt đầu: </span>
                           <span>{moment(task?.startTime).format("Do MMMM YYYY, h:mm a")}</span>
                        </div>
                        <div className={classes.info}>
                           <span className={classes.title}>Thời gian kết thúc: </span>
                           <span>{moment(task?.endTime).format("Do MMMM YYYY, h:mm a")}</span>
                        </div>
                     </div>
                     <div className={classes.section}>
                        <h4 className={classes.titleBody}>Mô tả</h4>
                        <div className={classes.info}>
                           {/* <p className={classes.title}>Nội dung công việc: </p> */}
                           {/* <div>{task?.taskDescription}</div> */}
                           <div
                              dangerouslySetInnerHTML={{ __html: task?.taskDescription as string }}
                           />
                        </div>
                     </div>
                  </div>
                  <div className={classes.right}>
                     <div className={classes.section}>
                        <h4 className={classes.titleBody}>Người liên quan</h4>
                        <div className={classes.info}>
                           <span className={classes.title}>Nhân viên phụ trách: </span>
                           <span>{task?.user.name}</span>
                        </div>
                        <div className={classes.info}>
                           <span className={classes.title}>Tên khách hàng: </span>
                           <span>{task?.customer.customerName}</span>
                        </div>
                     </div>

                     <div className={classes.section}>
                        <h4 className={classes.titleBody}>Thời gian</h4>
                        <div className={classes.info}>
                           <span className={classes.title}>Ngày tạo: </span>
                           {/* <span>{moment(task?.createdAt).format("Do MMMM YYYY, h:mm a")}</span> */}
                           <span>{moment(task?.createdAt).fromNow()}</span>
                        </div>
                        <div className={classes.info}>
                           <span className={classes.title}>Cập nhật lần cuối: </span>
                           {/* <span>{moment(task?.updatedAt).format("Do MMMM YYYY, h:mm a")}</span> */}
                           <span>{moment(task?.updatedAt).fromNow()}</span>
                        </div>
                     </div>
                  </div>
               </div>

               <div className={classes.info}>
                  <span className={classes.title}>Trạng thái: </span>
                  <span
                     className={`status ${
                        task?.status === "PROCESSING"
                           ? "processing"
                           : task?.status === "DONE"
                           ? "done"
                           : task?.status === "FAIL"
                           ? "fail"
                           : "cancelled"
                     } `}
                  >
                     {task?.status}
                  </span>
               </div>

               <button className={classes.btnDelete} onClick={deleteTaskhandler}>
                  <AiOutlineDelete /> Xóa công việc
               </button>
            </Panel>
         ) : (
            <Panel className={classes.taskDetail}>
               <h2>
                  <Skeleton width="50%" />
               </h2>
               <div className={classes.detailBody}>
                  <div className={classes.left}>
                     <div className={classes.section}>
                        <h4 className={classes.titleBody}>
                           <Skeleton width="100px" height="25px" style={{ marginTop: "1rem" }} />
                        </h4>
                        <Skeleton
                           width="60%"
                           count={2}
                           height="25px"
                           style={{ marginTop: "1rem" }}
                        />
                     </div>
                     <div className={classes.section}>
                        <h4 className={classes.titleBody}>
                           <Skeleton width="100px" height="25px" style={{ marginTop: "1rem" }} />
                        </h4>
                        <div className={classes.info}>
                           <Skeleton
                              width="100%"
                              count={5}
                              height="25px"
                              style={{ marginTop: "1rem" }}
                           />
                        </div>
                     </div>
                  </div>
                  <div className={classes.right}>
                     <div className={classes.section}>
                        <h4 className={classes.titleBody}>
                           <Skeleton width="100px" height="25px" style={{ marginTop: "1rem" }} />
                        </h4>
                        <Skeleton
                           width="60%"
                           count={2}
                           height="25px"
                           style={{ marginTop: "1rem" }}
                        />
                     </div>

                     <div className={classes.section}>
                        <h4 className={classes.titleBody}>
                           <Skeleton width="100px" height="25px" style={{ marginTop: "1rem" }} />
                        </h4>
                        <Skeleton
                           width="60%"
                           count={2}
                           height="25px"
                           style={{ marginTop: "1rem" }}
                        />
                     </div>
                  </div>
               </div>

               <div className={classes.info}>
                  <Skeleton width="100px" height="40px" style={{ marginTop: "1rem" }} />
               </div>
            </Panel>
         )}
      </>
   );
};

export default TaskDetail;
