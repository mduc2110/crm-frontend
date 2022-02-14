import React from "react";
import {
   AiOutlineBell,
   AiOutlineCaretDown,
   AiOutlineLogout,
   AiOutlineSetting,
   AiOutlineUser,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { useAppSelector } from "../../store";
import { AuthState, UIState } from "../../store/types";
import IconButton from "../UI/IconButton";
import classes from "./navbar.module.css";
const Navbar = () => {
   const auth: AuthState = useAppSelector((state) => state.auth);
   const ui: UIState = useAppSelector((state) => state.ui);
   const dispatch = useDispatch();

   const logoutHandler = () => {
      dispatch(logout());
   };
   return (
      <div className={classes.nav}>
         <div className={classes.left}>
            <h2>{ui.pageTitle}</h2>
         </div>
         <div className={classes.right}>
            <div className={classes.notification}>
               <AiOutlineBell />
               <div className={classes.count}>9+</div>
            </div>
            <div className={classes.userAcount}>Xin chào, {auth.user?.name}</div>
            <div className={`actionDropdown ${classes.action}`}>
               <IconButton iconComponent={<AiOutlineCaretDown />} />
               <div className="dropbox">
                  <ul>
                     <li>
                        <span>
                           <AiOutlineUser /> Thông tin cá nhân
                        </span>
                     </li>
                     <li>
                        <span>
                           <AiOutlineSetting /> Cài đặt
                        </span>
                     </li>
                     <li>
                        <span onClick={logoutHandler}>
                           <AiOutlineLogout /> Đăng xuất
                        </span>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
