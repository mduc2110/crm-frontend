import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllUser } from "../../actions/userAction";
import userApi from "../../api/userApi";
import { useAppDispatch } from "../../store";
import classes from "./userPage.module.css";
const UserPage = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      const fetchAllUser = async () => {
         dispatch(getAllUser());
      };
      fetchAllUser();
   }, []);
   return <div className={classes.userPage}>U</div>;
};

export default UserPage;
