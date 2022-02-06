import JoditEditor from "jodit-react";
import React, { FormEvent, useEffect, useRef, useState } from "react";
import customerApi from "../../../api/customerApi";
import taskApi from "../../../api/taskApi";
import userApi from "../../../api/userApi";
import useDebounce from "../../../hooks/useDebounce";
import { CustomerState } from "../../../store/types";
import { SelectType, UserState } from "../../../types";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import Select from "../../UI/Select";
import classes from "./taskModal.module.css";

export interface Task {
   customerId: string;
   endTime: string;
   startTime: string;
   status: string;
   taskDescription: string;
   taskName: string;
   taskTypeId: string;
   userId: string;
}

const TaskModal: React.FC<{ onClose: () => void; title: string; setIsFetching: () => void }> = (
   props
) => {
   const [task, setTask] = useState<Task>({
      customerId: "",
      endTime: "",
      startTime: "",
      status: "",
      taskDescription: "",
      taskName: "",
      taskTypeId: "",
      userId: "",
   });
   const [emplName, setEmplName] = useState<string>("");
   const [isEmplFieldFocused, setIsEmplFieldFocused] = useState<boolean>(false);
   const [emplList, setEmplList] = useState<UserState[]>([]);

   const [customerName, setCustomerName] = useState<string>("");
   const [isCustomerFieldFocused, setIsCustomerFieldFocused] = useState<boolean>(false);
   const [customersList, setCustomersList] = useState<CustomerState[]>([]);

   const [taskTypeList, setTaskTypeList] = useState<SelectType[]>([]);
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
            const response = await customerApi.getAll("?q=" + customerName);
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

      try {
         const result = await taskApi.create(task);
         console.log(result);
      } catch (error) {}
   };

   return (
      <Modal onClose={props.onClose}>
         <h2>{props.title}</h2>
         <div className={classes.taskModal}>
            <form onSubmit={(e) => onSubmitHandler(e)}>
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
                     <div className={classes.richTextArea}>
                        <span>Nội dung công việc</span>
                        <JoditEditor
                           ref={editor}
                           value={task.taskDescription}
                           onBlur={(content) => richTextHandler(content)}
                        />
                     </div>

                     <Select
                        options={taskTypeList}
                        value={task.taskTypeId}
                        className={classes.inputArea}
                        labelName={"Công việc"}
                        onChange={(e) =>
                           setTask((prev) => {
                              return { ...prev, taskTypeId: e.target.value };
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
                                       <button
                                          onClick={() =>
                                             onChangeEmployeeHandler(empl.id, empl.name)
                                          }
                                       >
                                          {empl.name}
                                       </button>
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
                                       <button
                                          onClick={() =>
                                             onChangeCustomerHandler(
                                                customer.id,
                                                customer.customerName
                                             )
                                          }
                                       >
                                          {customer.customerName}
                                       </button>
                                    </li>
                                 ))}
                              </ul>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
               <Button type="submit">Thêm</Button>
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
