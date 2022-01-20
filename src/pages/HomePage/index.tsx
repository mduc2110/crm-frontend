import React from "react";
import { Route, Routes } from "react-router-dom";
import Sidebar from "../../components/Sidebar";
import classes from "./homePage.module.css";
const HomePage = () => {
   return (
      <div className={classes.homePage}>
         <Sidebar />
         <Routes>
            <Route path="/dashboard" element={<div>dashboard</div>} />
            <Route path="/user" element={<div>user</div>} />
            <Route path="/customer" element={<div>customer</div>} />
         </Routes>
      </div>
   );
};

export default HomePage;
