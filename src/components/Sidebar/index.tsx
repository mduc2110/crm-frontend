import React from "react";
import {
   AiOutlineAppstore,
   AiOutlineForm,
   AiOutlineMail,
   AiOutlineMenu,
   AiOutlineOrderedList,
   AiOutlineStock,
   AiOutlineTeam,
   AiOutlineUser,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { toggleSidebar } from "../../actions/uiAction";
// import { logout } from "../../actions/auth";
import { getPermission } from "../../reducers/auth";
import { useAppSelector } from "../../store";
import classes from "./sidebar.module.css";
const Sidebar = () => {
   const uiState = useAppSelector((state) => state.ui);
   const auth = getPermission();
   const dispatch = useDispatch();
   // const {} = bindActionCreators( , dispatch);
   // const logoutHandler = () => {
   //    // dispatch(logout());
   //    // useAppDispatch(logout());
   //    dispatch(logout());
   // };
   return (
      <div className={`${classes.sidebar} ${uiState.toggleSideBar && classes.minimize}`}>
         <div className={`${classes.header}`}>
            <h1>CRM</h1>
            <button onClick={() => dispatch(toggleSidebar())}>
               <AiOutlineMenu />
            </button>
         </div>
         <ul>
            <li>
               <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? classes.active : "")}
               >
                  {/* <NavLink className={({ isActive }) => (isActive ? "active" : "")} */}
                  <AiOutlineAppstore /> <span>Dashboard</span>
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/customer"
                  className={({ isActive }) => (isActive ? classes.active : "")}
               >
                  <AiOutlineOrderedList />
                  <span>Khách hàng</span>
               </NavLink>
            </li>
            <li>
               <NavLink
                  to="/campaign"
                  className={({ isActive }) => (isActive ? classes.active : "")}
               >
                  <AiOutlineMail />
                  <span>Gửi mail</span>
               </NavLink>
            </li>
            {auth?.role === "ADMIN" || auth?.role === "CRM_MANAGER" ? (
               <li>
                  <NavLink
                     to="/user"
                     className={({ isActive }) => (isActive ? classes.active : "")}
                  >
                     <AiOutlineUser />
                     <span>Nhân viên</span>
                  </NavLink>
               </li>
            ) : null}
            <li>
               <NavLink
                  to="/statistic"
                  className={({ isActive }) => (isActive ? classes.active : "")}
               >
                  <AiOutlineStock />
                  <span>Thống kê</span>
               </NavLink>
            </li>
            <li>
               <NavLink to="/task" className={({ isActive }) => (isActive ? classes.active : "")}>
                  <AiOutlineForm />
                  <span>Công việc</span>
               </NavLink>
            </li>
            {auth?.role === "ADMIN" && (
               <li>
                  <NavLink
                     to="/role"
                     className={({ isActive }) => (isActive ? classes.active : "")}
                  >
                     <AiOutlineTeam />
                     <span>Quản lý phân quyền</span>
                  </NavLink>
               </li>
            )}
            <li>{/* <AiOutlineMail />{" "} */}</li>
         </ul>
         <p className={classes.copyright}>
            Copyright © 2022 CRM
            <br /> All rights reserved.
         </p>
         {/* <div className={classes.modal}></div> */}
         {/* <button onClick={logoutHandler}>
            <AiOutlineLogout /> Đăng xuất
         </button> */}
      </div>
   );
};

export default Sidebar;
