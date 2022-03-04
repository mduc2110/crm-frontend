import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Navbar from "../../components/Navbar";
import Sidebar from "../../components/Sidebar";
import TaskDetail from "../../components/TaskDetail";
import { getPermission } from "../../reducers/auth";
import { useAppSelector } from "../../store";
import CampaignPage from "../CampaginPage";
import CustomerPage from "../CustomerPage";
import Dashboard from "../Dashboard";
import RolePage from "../RolePage";
import StatisticPage from "../StatisticPage";
import TaskPage from "../TaskPage";
import UserPage from "../UserPage";
import classes from "./homePage.module.css";
const HomePage = () => {
   const uiState = useAppSelector((state) => state.ui);
   const auth = getPermission();

   return (
      <div className={`${classes.homePage}   ${uiState.toggleSideBar && classes.minimize}`}>
         <Sidebar />
         <div className={`${classes.contents}`}>
            <Navbar />
            <div className={`${classes.inner}`}>
               <Routes>
                  <Route path="/dashboard" element={<Dashboard />} />
                  {/* <Route path="/user" element={<UserPage />} /> */}
                  {(auth?.role === "ADMIN" || auth?.role === "CRM_MANAGER") && (
                     <Route path="/user" element={<UserPage />} />
                  )}
                  <Route path="/customer" element={<CustomerPage />} />
                  <Route path="/campaign" element={<CampaignPage />} />
                  <Route path="/task" element={<TaskPage />} />
                  <Route path="/statistic" element={<StatisticPage />} />
                  <Route path="/task/:id" element={<TaskDetail />} />
                  {auth?.role === "ADMIN" && <Route path="/role" element={<RolePage />} />}
                  {/* <Route path="/task/:id" element={<TaskDetail />} /> */}
                  <Route path="/*" element={<Navigate to="/dashboard" />} />
               </Routes>
            </div>
         </div>
      </div>
   );
};

export default HomePage;
