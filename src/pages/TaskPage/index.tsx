import React, { useEffect, useState } from "react";
import classes from "./taskpage.module.css";
import Panel from "../../components/UI/Panel";
import Button from "../../components/UI/Button";
import taskApi from "../../api/taskApi";
import { useLocation, useNavigate } from "react-router-dom";
import queryString from "query-string";
import TaskList from "../../components/TaskList";
import Input from "../../components/UI/Input";
import moment from "moment";
import { AiOutlinePlusCircle } from "react-icons/ai";
import TaskModal from "../../components/Modals/TaskModal";

interface TaskFilter {
   id: number;
   nameType: string;
}

const TaskPage = () => {
   const [taskFilter, setTaskFilter] = useState<TaskFilter[]>([]);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [searchDay, setSearchDay] = useState<{
      from: string;
      to: string;
   }>({
      from: moment(new Date(Date.now() - 86400000 * 3)).format("yyyy-MM-DD"),
      to: moment(new Date()).format("yyyy-MM-DD"),
   });
   const [modalIsShown, setModalIsShown] = useState<boolean>(false);
   const navigate = useNavigate();
   const location = useLocation();

   useEffect(() => {
      const fetchFilter = async () => {
         const response = await taskApi.getTaskFilter();
         setTaskFilter(response.data);
         setIsLoading(false);
      };
      fetchFilter();
      const parsed = queryString.parse(location.search);
   }, [location.search, isLoading]);

   const taskFilterHandler = (id?: number) => {
      const queryParams = new URLSearchParams(location.search);

      if (id) {
         navigate("?idType=" + id);
      } else {
         // navigate(location.pathname);
         navigate("");
      }
   };
   const searchHandler = (e: React.FormEvent) => {
      e.preventDefault();
      // const q = queryString.stringify(searchDay);
      setIsLoading(true);
      const q = queryString.parse(location.search);
      q.from = searchDay.from;
      q.to = searchDay.to;
      navigate("?" + queryString.stringify(q));
   };

   const hideModalHandler = () => {
      setModalIsShown(false);
   };

   const addCustomerHandler = () => {
      setModalIsShown(true);
   };

   return (
      <div className={classes.taskPage}>
         {modalIsShown && <TaskModal title="Tạo công việc" onClose={hideModalHandler} />}
         <Panel className={classes.left}>
            <h3>Phân loại công việc</h3>
            <ul>
               <li>
                  <button onClick={() => taskFilterHandler()}>Tất cả</button>
               </li>
               {taskFilter?.map((element, index) => (
                  <li key={index}>
                     <button onClick={() => taskFilterHandler(element.id)}>
                        {element.nameType}
                     </button>
                  </li>
               ))}
            </ul>
         </Panel>
         <Panel className={classes.right}>
            <div className={classes.header}>
               <form className={classes.search} onSubmit={(e) => searchHandler(e)}>
                  <Input
                     className={classes.inputWrap}
                     value={searchDay.from}
                     type="date"
                     labelName="Từ ngày"
                     onChange={(e) =>
                        setSearchDay({
                           ...searchDay,
                           from: e.target.value,
                        })
                     }
                  />
                  <span>-</span>
                  <Input
                     className={classes.inputWrap}
                     value={searchDay.to}
                     type="date"
                     labelName="Đến ngày"
                     onChange={(e) =>
                        setSearchDay({
                           ...searchDay,
                           to: e.target.value,
                        })
                     }
                  />
                  <Button type="submit" disabled={isLoading}>
                     Tìm kiếm
                  </Button>
               </form>
               <Button onClick={addCustomerHandler}>
                  <AiOutlinePlusCircle />
                  Tạo công việc
               </Button>
            </div>
            <TaskList />
         </Panel>
      </div>
   );
};

export default TaskPage;
