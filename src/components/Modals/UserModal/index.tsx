import React, { FormEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { addUser } from "../../../actions/userAction";
import roleApi from "../../../api/roleApi";
import userApi from "../../../api/userApi";
import { Role, SelectType, UserPostData } from "../../../types";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import Select from "../../UI/Select";
import classes from "./userModal.module.css";
const UserModal: React.FC<{
   onClose: () => void;
   title: string;
}> = (props) => {
   const [user, setUser] = useState<UserPostData>({
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      phone: "",
      name: "",
      deptId: "",
      roleId: "",
   });
   const [loading, setLoading] = useState<boolean>(false);
   const [isValidPassword, setIsvalidPassword] = useState<boolean>(false);

   const [roleList, setRoleList] = useState<SelectType[]>([]);
   const [deptList, setDeptList] = useState<SelectType[]>([]);

   const dispatch = useDispatch();

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
      };
      const fetchDept = async () => {
         const response = await userApi.getAllDept();
         const deptData: { id: string; departmentName: string }[] = response.data;
         setDeptList(
            deptData.map((dept) => {
               return {
                  id: dept.id,
                  name: dept.departmentName,
               };
            })
         );
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
   const submitUserHandler = async (e: FormEvent) => {
      e.preventDefault();
      if (!isValidPassword) {
         toast.error("Password không trùng khớp");
      }
      console.log(user);
      try {
         await setLoading(true);
         await dispatch(addUser(user));
         await setLoading(false);
         await props.onClose();
      } catch (error) {
         console.log(error);
      }
   };
   return (
      <Modal onClose={props.onClose} isLoading={loading}>
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
            <Select
               options={deptList}
               value={user.deptId}
               className={classes.inputArea}
               labelName={"Phòng ban"}
               onChange={(e) =>
                  setUser((prev) => {
                     return { ...prev, deptId: e.target.value };
                  })
               }
            />
            <Button type="submit">Thêm</Button>
         </form>
      </Modal>
   );
};

export default UserModal;
