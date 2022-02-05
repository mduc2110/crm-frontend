import React, { FormEvent, useState } from "react";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import classes from "./taskModal.module.css";
interface Task {
   customerId: string;
   endTime: string;
   startTime: string;
   status: string;
   taskDescription: string;
   taskName: string;
   taskTypeId: string;
   userId: string;
}

const TaskModal: React.FC<{ onClose: () => void; title: string }> = (props) => {
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
   const onSubmitHandler = (e: FormEvent) => {
      e.preventDefault();
   };
   console.log(task);

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
                              return { ...prev, customerName: e.target.value };
                           })
                        }
                     />
                     <Input
                        value={task.taskTypeId}
                        className={classes.inputArea}
                        labelName={"Số điện thoại"}
                        onChange={(e) =>
                           setTask((prev) => {
                              return { ...prev, phone: e.target.value };
                           })
                        }
                     />
                     <div className={classes.searchBox}>
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
                        <div className={`actionDropdown ${classes.quickSearch}`}>
                           <ul className="dropbox">
                              <li>
                                 <button>Nhân viên 1</button>
                              </li>
                              <li>
                                 <button>Nhân viên 2</button>
                              </li>
                              <li>
                                 <button>Nhân viên 3</button>
                              </li>
                              <li>
                                 <button>Nhân viên 4</button>
                              </li>
                           </ul>
                        </div>
                     </div>
                     <Input
                        value={task.endTime}
                        className={classes.inputArea}
                        labelName={"Thời gian kết thúc"}
                        type="datetime-local"
                        onChange={(e) =>
                           setTask((prev) => {
                              return { ...prev, endTime: e.target.value };
                           })
                        }
                     />
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
