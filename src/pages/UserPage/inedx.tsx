import React, { useEffect, useState } from "react";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import { getAllUser } from "../../actions/userAction";
import userApi from "../../api/userApi";
import CustomerList from "../../components/CustomerList";
import UserModal from "../../components/Modals/UserModal";
import Button from "../../components/UI/Button";
import Panel from "../../components/UI/Panel";
import SearchBar from "../../components/UI/SearchBar";
import UserList from "../../components/UserList";
import { useAppSelector } from "../../store";
import classes from "./userPage.module.css";

const UserPage = () => {
   const [modalIsShown, setModalIsShown] = useState<boolean>(false);
   const dispatch = useDispatch();
   const location = useLocation();
   useEffect(() => {
      const fetchAllUser = async () => {
         dispatch(getAllUser(location.search));
      };
      fetchAllUser();
   }, [dispatch, location.search]);

   const addUserHandler = () => {
      setModalIsShown(true);
   };

   const hideModalHandler = () => {
      setModalIsShown(false);
   };
   return (
      <div className={classes.userPage}>
         {modalIsShown && <UserModal title="Thêm nhân viên" onClose={hideModalHandler} />}
         <Panel>
            <div className={classes.header}>
               <SearchBar />
               <Button onClick={addUserHandler}>
                  <AiOutlinePlusCircle /> Thêm nhân viên
               </Button>
            </div>
            <UserList />
         </Panel>
      </div>
   );
};

export default UserPage;
