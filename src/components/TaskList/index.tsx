import React, { useEffect, useState } from "react";
import classes from "./taskList.module.css";
import Table from "../UI/Table";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import { TaskState } from "../../store/types";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";
import { getAllTask } from "../../actions/taskAction";

const TaskList: React.FC<{
   isFetching: boolean;
   setIsFetching: () => void;
   onShowModal: () => void;
}> = (props) => {
   const location = useLocation();
   const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
   const dispatch = useDispatch();
   const taskList: TaskState[] = useAppSelector((state) => state.task);
   useEffect(() => {
      // let isMounted = true;
      setIsFetchingData(true);
      dispatch(getAllTask(location.search));
      // setIsFetchingData(true);
      // const fetchTask = async () => {
      //    const response = await taskApi.getAll(location.search);
      //    if (isMounted) {
      //       setTaskList(response.data.results);
      //       props.setIsFetching();

      //       setIsFetchingData(false);
      //    }

      // };
      // fetchTask();
      props.setIsFetching();
      setIsFetchingData(false);
      // return () => {
      //    isMounted = false;
      // };
   }, [location.search, props, dispatch]);

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
                           <td style={{ width: "400px" }}>
                              {/* <span onClick={props.onShowModal}>{task.taskName}</span> */}
                              <Link to={"/task/" + task.id}>{task.taskName}</Link>
                           </td>
                           <td>{task.tasktype.nameType}</td>
                           <td>{task.user.name}</td>
                           <td>
                              <span
                                 style={{ fontSize: "0.75rem" }}
                                 className={` status ${
                                    task?.status === "PROCESSING"
                                       ? "processing"
                                       : task?.status === "DONE"
                                       ? "done"
                                       : task?.status === "FAIL"
                                       ? "fail"
                                       : "cancelled"
                                 } `}
                              >
                                 {task.status}
                              </span>
                           </td>
                        </tr>
                     );
                  })}
            </tbody>
         </Table>
      </div>
   );
};

export default TaskList;
