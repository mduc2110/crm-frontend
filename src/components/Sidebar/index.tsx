import React from "react";
import { AiOutlineAppstore, AiOutlineLogout, AiOutlineMail, AiOutlineOrderedList, AiOutlineStock, AiOutlineTeam, AiOutlineUser } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { logout } from "../../actions/auth";
import { useAppDispatch } from "../../store";
import classes from "./sidebar.module.css";
const Sidebar = () => {
   const dispatch = useDispatch();
   // const {} = bindActionCreators( , dispatch);
   const logoutHandler = () => {
      // dispatch(logout());
      // useAppDispatch(logout());
      dispatch(logout());
   };
   return (
      <div className={classes.sidebar}>
         <ul>
            <li>
               <NavLink to="/dashboard" className={"active"}>
                  {/* <NavLink className={({ isActive }) => (isActive ? "active" : "")} */}
                  <AiOutlineAppstore /> Dashboard
               </NavLink>
            </li>
            <li>
               <NavLink to="/customer">
                  <AiOutlineMail /> Khách hàng
               </NavLink>
            </li>
            <li>
               <NavLink to="/user">
                  <AiOutlineUser />
                  Nhân viên
               </NavLink>
            </li>
            <li>
               <NavLink to="/statistic">
                  <AiOutlineStock />
                  Thống kê
               </NavLink>
            </li>
            <li>
               <NavLink to="/task">
                  <AiOutlineOrderedList />
                  Công việc
               </NavLink>
            </li>
            <li>
               <NavLink to="/role">
                  <AiOutlineTeam />
                  Quản lý phân quyền
               </NavLink>
            </li>
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
