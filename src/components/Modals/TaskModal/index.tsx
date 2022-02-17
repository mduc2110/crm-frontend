import JoditEditor from "jodit-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { createTask, updateTask } from "../../../actions/taskAction";
import customerApi from "../../../api/customerApi";
import taskApi from "../../../api/taskApi";
import userApi from "../../../api/userApi";
import useDebounce from "../../../hooks/useDebounce";
import { CustomerState, UserState } from "../../../store/types";
import { SelectType, TaskPostData } from "../../../types";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import Select from "../../UI/Select";
import classes from "./taskModal.module.css";

import queryString from "query-string";
import moment from "moment";

const TaskModal: React.FC<{ onClose: () => void; title: string; setIsFetching: () => void }> = (
   props
) => {
   const [task, setTask] = useState<TaskPostData>({
      customerId: "",
      endTime: "",
      startTime: moment(new Date()).format("YYYY-MM-DDTkk:mm"),
      status: "",
      taskDescription: "",
      taskName: "",
      tasktypeId: "",
      userId: "",
   });
   const [emplName, setEmplName] = useState<string>("");
   const [isEmplFieldFocused, setIsEmplFieldFocused] = useState<boolean>(false);
   const [emplList, setEmplList] = useState<UserState[]>([]);

   const [customerName, setCustomerName] = useState<string>("");
   const [isCustomerFieldFocused, setIsCustomerFieldFocused] = useState<boolean>(false);
   const [customersList, setCustomersList] = useState<CustomerState[]>([]);

   const [taskTypeList, setTaskTypeList] = useState<SelectType[]>([]);

   const [statusList, setStatusList] = useState<SelectType[]>([
      {
         id: "PROCESSING",
         name: "PROCESSING",
      },
      {
         id: "DONE",
         name: "DONE",
      },
      {
         id: "FAIL",
         name: "FAIL",
      },
      {
         id: "CANCELLED",
         name: "CANCELLED",
      },
      {
         id: "POSTPONE",
         name: "POSTPONE",
      },
   ]);

   const [buttonText, setButtonText] = useState<string>("Thêm");
   const [title, setTitle] = useState<string>("Tạo mới công việc");

   const dispatch = useDispatch();
   const location = useLocation();

   useEffect(() => {
      const { id, edit } = queryString.parse(location.search);

      const fetchData = async (id: string) => {
         const response = await taskApi.getOne(id);
         console.log(response.data);

         setTask({
            startTime: moment(new Date(response.data.startTime)).format("YYYY-MM-DDTkk:mm"),
            endTime: moment(new Date(response.data.endTime)).format("YYYY-MM-DDTkk:mm"),
            customerId: response.data.customer?.id || "",
            tasktypeId: response.data.tasktype.id,
            userId: response.data.user.id,
            status: response.data.status,
            taskDescription: response.data.taskDescription,
            taskName: response.data.taskName,
         });

         setCustomerName(response.data.customer?.customerName || "");
         setEmplName(response.data.user.name);
      };
      if (edit && edit === "T") {
         setButtonText("Cập nhật");
         setTitle("Cập nhật công việc");
      }
      if (id) {
         fetchData(id as string);
      }
   }, [location.search]);

   useEffect(() => {
      const fetchType = async () => {
         const response = await taskApi.getTaskFilter();
         const data: { id: string; nameType: string }[] = response.data;
         const taskList = data.map((item) => {
            return {
               id: item.id,
               name: item.nameType,
            };
         });
         setTaskTypeList(taskList);
      };
      fetchType();
   }, []);
   //employee
   useDebounce(
      () => {
         const fetchUserByName = async () => {
            const response = await userApi.getAll("?q=" + emplName);

            setEmplList(response.data.results);
         };
         fetchUserByName();
      },
      700,
      [emplName]
   );
   const onChangeEmployeeHandler = (id: string, name: string) => {
      setTask((prev) => {
         return { ...prev, userId: id };
      });
      setEmplName(name);
      setIsEmplFieldFocused(false);
   };
   //customer
   useDebounce(
      () => {
         const fetchCustomerByName = async () => {
            let query = "";
            if (customerName) {
               query += "?q=" + customerName;
            } else {
               query += "?limit=10";
            }

            const response = await customerApi.getAll(query);
            setCustomersList(response.data.results);
         };
         fetchCustomerByName();
      },
      700,
      [customerName]
   );
   const onChangeCustomerHandler = (id: string, name: string) => {
      setTask((prev) => {
         return { ...prev, customerId: id };
      });
      setCustomerName(name);
      setIsCustomerFieldFocused(false);
   };

   const editor = useRef(null);
   const richTextHandler = (content: string) => {
      setTask((prev) => {
         return { ...prev, taskDescription: content };
      });
   };
   const onSubmitHandler = async (e: FormEvent) => {
      e.preventDefault();
      const { id, edit } = queryString.parse(location.search);
      if (edit === "T") {
         await dispatch(updateTask(id as string, task));
      } else {
         await dispatch(createTask(task));
      }
      // const response = responseFunction();
      await props.onClose();
   };

   return (
      <Modal onClose={props.onClose} className={classes.taskModal}>
         <h2 className={classes.title}>{title}</h2>
         <div className={classes.inner}>
            <form onSubmit={onSubmitHandler}>
               <div className={classes.inputWrap}>
                  <div className={classes.informationArea}>
                     <Input
                        value={task.taskName}
                        className={classes.inputArea}
                        labelName={"Tiêu đề"}
                        onChange={(e) =>
                           setTask((prev) => {
                              return { ...prev, taskName: e.target.value };
                           })
                        }
                     />
                     <div className={classes.timeArea}>
                        <Input
                           value={task.startTime}
                           className={classes.inputArea}
                           labelName={"Thời gian bắt đầu"}
                           type="datetime-local"
                           onChange={(e) =>
                              setTask((prev) => {
                                 return { ...prev, startTime: e.target.value };
                              })
                           }
                        />
                        <span>-</span>
                        <Input
                           value={task.endTime}
                           className={classes.inputArea}
                           labelName={"Thời gian kết thúc"}
                           type="datetime-local"
                           min={task.startTime}
                           onChange={(e) =>
                              setTask((prev) => {
                                 return { ...prev, endTime: e.target.value };
                              })
                           }
                        />
                     </div>

                     <Select
                        options={taskTypeList}
                        value={task.tasktypeId}
                        className={classes.inputArea}
                        labelName={"Công việc"}
                        onChange={(e) =>
                           setTask((prev) => {
                              return { ...prev, tasktypeId: e.target.value };
                           })
                        }
                     />

                     <div className={classes.searchBox}>
                        <Input
                           value={emplName}
                           className={classes.inputArea}
                           labelName={"Nhân viên phụ trách"}
                           onChange={(e) => setEmplName(e.target.value)}
                           onFocus={() => setIsEmplFieldFocused(true)}
                        />
                        <div
                           className={`actionDropdown ${classes.quickSearch} ${
                              isEmplFieldFocused ? classes.active : ""
                           }`}
                        >
                           <div className={`dropbox ${classes.dropbox}`}>
                              <ul>
                                 {emplList?.map((empl, index) => (
                                    <li key={index}>
                                       <span
                                          onClick={() =>
                                             onChangeEmployeeHandler(empl.id, empl.name)
                                          }
                                       >
                                          {`${empl.name} - ${empl.phone}`}
                                       </span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>
                     <div className={classes.searchBox}>
                        <Input
                           value={customerName}
                           className={classes.inputArea}
                           labelName={"Khách hàng"}
                           onChange={(e) => setCustomerName(e.target.value)}
                           onFocus={() => setIsCustomerFieldFocused(true)}
                           // onBlur={() => setIsEmplFieldFocused(true)}
                        />
                        <div
                           className={`actionDropdown ${classes.quickSearch} ${
                              isCustomerFieldFocused ? classes.active : ""
                           }`}
                        >
                           <div className={`dropbox ${classes.dropbox}`}>
                              <ul>
                                 {customersList?.map((customer, index) => (
                                    <li key={index}>
                                       <span
                                          onClick={() =>
                                             onChangeCustomerHandler(
                                                customer.id,
                                                customer.customerName
                                             )
                                          }
                                       >
                                          {`${customer.customerName} - ${customer.phone}`}
                                       </span>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>

                     <div className={classes.richTextArea}>
                        <span>Nội dung công việc</span>
                        <JoditEditor
                           ref={editor}
                           value={task.taskDescription}
                           onBlur={(content) => richTextHandler(content)}
                        />
                     </div>
                  </div>
               </div>
               <Select
                  options={statusList}
                  value={task.status}
                  labelName={"Trạng thái"}
                  onChange={(e) =>
                     setTask((prev) => {
                        return { ...prev, status: e.target.value };
                     })
                  }
               />
               <Button type="submit">{buttonText}</Button>
            </form>

            {/* <DatePicker 
               value={customerField.birthday}
            onChange={(e) =>
                  setTask((prev) => {
                     return { ...prev, idWard: e };
                  })
               }/> */}
         </div>
      </Modal>
   );
};

export default TaskModal;
