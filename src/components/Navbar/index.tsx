import React from "react";
import { AiOutlineBell, AiOutlineCaretDown, AiOutlineLogout } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { logout } from "../../actions/auth";
import { getToken } from "../../reducers/auth";
import { useAppSelector } from "../../store";
import { AuthState } from "../../store/types";
import IconButton from "../UI/IconButton";
import classes from "./navbar.module.css";
const Navbar = () => {
   const auth: AuthState = useAppSelector((state) => state.auth);
   const dispatch = useDispatch();

   const logoutHandler = () => {
      dispatch(logout());
   };
   return (
      <div className={classes.nav}>
         <div className={classes.left}></div>
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
                        <button onClick={logoutHandler}>
                           Đăng xuất <AiOutlineLogout />
                        </button>
                     </li>
                  </ul>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Navbar;
