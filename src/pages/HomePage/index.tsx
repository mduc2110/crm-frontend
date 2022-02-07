import React from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TaskDetail from "../../components/TaskDetail";
import CustomerPage from "../CustomerPage";
import TaskPage from "../TaskPage";
import UserPage from "../UserPage/inedx";
import classes from "./homePage.module.css";
const HomePage = () => {
   return (
      <div className={classes.homePage}>
         <Sidebar />
         <div className={classes.contents}>
            <Navbar />
            <div className={classes.inner}>
               <Routes>
                  <Route path="/dashboard" element={<div>dashboard</div>} />
                  <Route path="/user" element={<UserPage />} />
                  <Route path="/customer" element={<CustomerPage />} />
                  <Route path="/task" element={<TaskPage />} />
                  <Route path="/task/:id" element={<TaskDetail />} />
               </Routes>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
