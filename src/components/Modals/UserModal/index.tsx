import { log } from "console";
import React, {
   ChangeEvent,
   createRef,
   FormEvent,
   RefObject,
   useEffect,
   useRef,
   useState,
} from "react";
import roleApi from "../../../api/roleApi";
import userApi from "../../../api/userApi";
import { UserState } from "../../../store/types";
import { Role, SelectType } from "../../../types";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import Select from "../../UI/Select";
import classes from "./userModal.module.css";
const UserModal: React.FC<{
   onClose: () => void;
   title: string;
}> = (props) => {
   const [user, setUser] = useState({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      name: "",
      deptId: "",
      roleId: "",
   });
   const [isValid, setIsvalid] = useState<boolean>(false);
   const [isValidPassword, setIsvalidPassword] = useState<boolean>(false);

   const [roleList, setRoleList] = useState<SelectType[]>([]);
   const [deptList, setDeptList] = useState<SelectType[]>([]);

   useEffect(() => {
      const fetchRole = async () => {
         const response = await roleApi.getAll();
         const roleData: Role[] = response.data;
         setRoleList(
            roleData.map((role) => {
               return {
                  id: role.id,
                  name: role.description,
               };
            })
         );
         console.log(response.data);
      };
      const fetchDept = async () => {
         const response = await userApi.getAllDept();
         console.log(response.data);
      };
      fetchDept();
      fetchRole();
   }, []);

   const checkPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
      setUser((prev) => {
         return {
            ...prev,
            confirmPassword: e.target.value,
         };
      });
      if (e.target.value !== user.password) {
         console.log("hhhh");
      } else {
         setIsvalidPassword(true);
      }
   };
   const submitUserHandler = (e: FormEvent) => {
      e.preventDefault();
      console.log(user);
   };
   return (
      <Modal onClose={props.onClose}>
         <h2>{props.title}</h2>
         <form onSubmit={submitUserHandler}>
            <Input
               value={user.username}
               className={classes.inputArea}
               labelName={"Tên đăng nhập"}
               onChange={(e) =>
                  setUser((prev) => {
                     return { ...prev, username: e.target.value };
                  })
               }
            />
            <Input
               value={user.password}
               className={classes.inputArea}
               labelName={"Mật khẩu"}
               type="password"
               onChange={(e) =>
                  setUser((prev) => {
                     return { ...prev, password: e.target.value };
                  })
               }
            />
            <Input
               value={user.confirmPassword}
               className={classes.inputArea}
               type="password"
               labelName={"Nhập lại mật khẩu"}
               onChange={(e) => checkPassword(e)}
            />
            <Input
               value={user.email}
               className={classes.inputArea}
               labelName={"Email"}
               type="email"
               onChange={(e) =>
                  setUser((prev) => {
                     return { ...prev, email: e.target.value };
                  })
               }
            />
            <Input
               value={user.phone}
               className={classes.inputArea}
               labelName={"Số điện thoại"}
               onChange={(e) =>
                  setUser((prev) => {
                     return { ...prev, phone: e.target.value };
                  })
               }
            />
            <Input
               value={user.name}
               className={classes.inputArea}
               labelName={"Họ và tên"}
               onChange={(e) =>
                  setUser((prev) => {
                     return { ...prev, name: e.target.value };
                  })
               }
            />
            <Select
               options={roleList}
               value={user.roleId}
               className={classes.inputArea}
               labelName={"Chức vụ"}
               onChange={(e) =>
                  setUser((prev) => {
                     return { ...prev, roleId: e.target.value };
                  })
               }
            />
            <Button type="submit">Thêm</Button>
         </form>
      </Modal>
   );
};

export default UserModal;
