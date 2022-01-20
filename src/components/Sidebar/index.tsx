import React from "react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import classes from "./sidebar.module.css";
const Sidebar = () => {
   return (
      <div className={classes.sidebar}>
         <ul>
            <li>
               <AiOutlineMail /> <NavLink to="/customer">Customer</NavLink>
            </li>
            <li>
               <AiOutlineUser />
               <NavLink to="/user">User</NavLink>
            </li>
            <li>
               <AiOutlineMail />{" "}
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
