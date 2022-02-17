import React from "react";
import {
   AiOutlineAppstore,
   AiOutlineForm,
   AiOutlineMail,
   AiOutlineOrderedList,
   AiOutlineStock,
   AiOutlineTeam,
   AiOutlineUser,
} from "react-icons/ai";
import { NavLink } from "react-router-dom";
// import { logout } from "../../actions/auth";
import { getPermission } from "../../reducers/auth";
import classes from "./sidebar.module.css";
const Sidebar = () => {
   const auth = getPermission();
   // const {} = bindActionCreators( , dispatch);
   // const logoutHandler = () => {
   //    // dispatch(logout());
   //    // useAppDispatch(logout());
   //    dispatch(logout());
   // };
   return (
      <div className={classes.sidebar}>
         <h1>CRM</h1>
         <ul>
            <li>
               <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? classes.active : "")}
               >
                  {/* <NavLink className={({ isActive }) => (isActive ? "active" : "")} */}
                  <AiOutlineAppstore /> Dashboard
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/customer"
                  className={({ isActive }) => (isActive ? classes.active : "")}
               >
                  <AiOutlineOrderedList />
                  Khách hàng
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/campaign"
                  className={({ isActive }) => (isActive ? classes.active : "")}
               >
                  <AiOutlineMail />
                  Gửi mail
               </NavLink>
            </li>
            {auth?.role === "ADMIN" || auth?.role === "CRM_MANAGER" ? (
               <li>
                  <NavLink
                     to="/user"
                     className={({ isActive }) => (isActive ? classes.active : "")}
                  >
                     <AiOutlineUser />
                     Nhân viên
                  </NavLink>
               </li>
            ) : null}
            <li>
               <NavLink
                  to="/statistic"
                  className={({ isActive }) => (isActive ? classes.active : "")}
               >
                  <AiOutlineStock />
                  Thống kê
               </NavLink>
            </li>
            <li>
               <NavLink to="/task" className={({ isActive }) => (isActive ? classes.active : "")}>
                  <AiOutlineForm />
                  Công việc
               </NavLink>
            </li>
            {auth?.role === "ADMIN" && (
               <li>
                  <NavLink
                     to="/role"
                     className={({ isActive }) => (isActive ? classes.active : "")}
                  >
                     <AiOutlineTeam />
                     Quản lý phân quyền
                  </NavLink>
               </li>
            )}
            <li>{/* <AiOutlineMail />{" "} */}</li>
         </ul>
         {/* <div className={classes.modal}></div> */}
         {/* <button onClick={logoutHandler}>
            <AiOutlineLogout /> Đăng xuất
         </button> */}
      </div>
   );
};

export default Sidebar;
