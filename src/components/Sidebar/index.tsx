import React from "react";
import { AiOutlineAppstore, AiOutlineMail, AiOutlineStock, AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./sidebar.module.css";
const Sidebar = () => {
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
               <AiOutlineMail />{" "}
            </li>
         </ul>
         <div className={classes.modal}></div>
      </div>
   );
};

export default Sidebar;
