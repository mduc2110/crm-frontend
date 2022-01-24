import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import CustomerPage from "../CustomerPage";
import classes from "./homePage.module.css";
const HomePage = () => {
   return (
      <div className={classes.homePage}>
         <Sidebar />
         <div className={classes.contents}>
         <nav>Navbar</nav>
         <div className={classes.inner}>
            <Routes>
               <Route path="/dashboard" element={<div>dashboard</div>} />
               <Route path="/user" element={<div>user</div>} />
               <Route path="/customer" element={<CustomerPage/>} />
            </Routes>

         </div>
         </div>
      </div>
   );
};

export default HomePage;
