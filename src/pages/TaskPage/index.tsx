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
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../actions/uiAction";

interface TaskFilter {
   id: number;
   nameType: string;
   active: boolean | undefined;
}

const TaskPage = () => {
   const [taskFilter, setTaskFilter] = useState<TaskFilter[]>([]);
   // const [isLoading, setIsLoading] = useState<boolean>(false);
   const [searchDay, setSearchDay] = useState<{
      from: string;
      to: string;
   }>({
      from: moment(new Date(Date.now() - 86400000 * 3)).format("yyyy-MM-DD"),
      to: moment(new Date()).format("yyyy-MM-DD"),
   });
   const [modalIsShown, setModalIsShown] = useState<boolean>(false);
   const [isFetching, setIsFetching] = useState<boolean>(false);
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();

   const [isActiveAllFilter, setIsActiveAllfilter] = useState<boolean>(true);
   useEffect(() => {
      dispatch(setPageTitle("Công việc"));
   }, [dispatch]);
   useEffect(() => {
      const fetchFilter = async () => {
         const response = await taskApi.getTaskFilter();
         const data: TaskFilter[] = response.data;
         const params = queryString.parse(location.search);
         // if (params.idType) {
         // }
         // console.log(params);
         // setTaskFilter(response.data);
         setTaskFilter(
            data.map((item) => {
               let active = false;
               if (params.idType && +params.idType === item.id) {
                  active = true;
               }
               return {
                  id: item.id,
                  nameType: item.nameType,
                  active: active,
               };
            })
         );
      };

      fetchFilter();
   }, []);
   useEffect(() => {
      const params = queryString.parse(location.search);
      const id = params.idType;
      const edit = params.edit;

      if (edit && edit === "T") {
         setModalIsShown(edit && edit === "T");
      }

      //for active filter
      if (!id) {
         setIsActiveAllfilter(true);
         setTaskFilter((prev) => {
            return prev.map((item) => {
               return {
                  ...item,
                  active: false,
               };
            });
         });
      } else {
         setIsActiveAllfilter(false);

         setTaskFilter((prev) => {
            const index = prev.findIndex((item) => +item.id === +id);
            const cloneFilter = prev.map((item) => {
               return {
                  ...item,
                  active: false,
               };
            });
            cloneFilter[index] = {
               ...cloneFilter[index],
               active: true,
            };
            return cloneFilter;
         });
      }
   }, [location.search]);

   const taskFilterHandler = (id?: number) => {
      // const queryParams = new URLSearchParams(location.search);
      if (id) {
         navigate("?idType=" + id);
      } else {
         navigate("");
      }
   };
   const searchHandler = (e: React.FormEvent) => {
      e.preventDefault();
      // const q = queryString.stringify(searchDay);
      setIsFetching(true);
      const q = queryString.parse(location.search);
      q.from = searchDay.from;
      q.to = searchDay.to;
      navigate("?" + queryString.stringify(q));
   };
   const hideModalHandler = () => {
      const parsedQuery = queryString.parse(location.search);
      if (parsedQuery.edit) {
         delete parsedQuery.edit;
      }
      if (parsedQuery.id) {
         delete parsedQuery.id;
      }
      navigate("?" + queryString.stringify(parsedQuery));
      setModalIsShown(false);
   };

   const addCustomerHandler = () => {
      setModalIsShown(true);
   };

   return (
      <div className={classes.taskPage}>
         {modalIsShown && (
            <TaskModal
               title="Tạo công việc"
               onClose={hideModalHandler}
               setIsFetching={() => setIsFetching(true)}
            />
         )}
         <Panel className={classes.left}>
            <h3>Phân loại công việc</h3>
            <ul className={classes.menuFilter}>
               <li>
                  <button
                     className={isActiveAllFilter ? classes.active : ""}
                     onClick={() => taskFilterHandler()}
                  >
                     Tất cả
                  </button>
               </li>
               {taskFilter?.map((element, index) => (
                  <li key={index}>
                     <button
                        className={element.active ? classes.active : ""}
                        onClick={() => taskFilterHandler(element.id)}
                     >
                        {element.nameType}
                     </button>
                  </li>
               ))}
            </ul>
         </Panel>
         <Panel className={classes.right}>
            <div className={classes.header}>
               <form className={classes.search} onSubmit={searchHandler}>
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
                  <Button type="submit" disabled={isFetching}>
                     Tìm kiếm
                  </Button>
               </form>
               <Button onClick={addCustomerHandler}>
                  <AiOutlinePlusCircle />
                  Tạo công việc
               </Button>
            </div>
            <TaskList
               onShowModal={() => setModalIsShown(true)}
               isFetching={isFetching}
               setIsFetching={() => setIsFetching(false)}
            />
         </Panel>
      </div>
   );
};

export default TaskPage;
