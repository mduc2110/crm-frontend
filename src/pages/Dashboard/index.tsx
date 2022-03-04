import React, { ReactNode, useEffect } from "react";
import { AiOutlineForm, AiOutlineUser, AiOutlineHeart } from "react-icons/ai";
import Panel from "../../components/UI/Panel";
import classes from "./Dashboard.module.css";
import { Chart, Doughnut } from "react-chartjs-2";
import {
   Chart as ChartJS,
   LinearScale,
   CategoryScale,
   BarElement,
   PointElement,
   LineElement,
   Legend,
   Tooltip,
   ArcElement,
} from "chart.js";
import NewCustomer from "../../components/Dashboard/NewCustomer";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../actions/uiAction";
import taskApi from "../../api/taskApi";
import customerApi from "../../api/customerApi";
import { useState } from "react";
import NewTask from "../../components/Dashboard/NewTask";
import { Oval } from "react-loader-spinner";
ChartJS.register(
   LinearScale,
   CategoryScale,
   BarElement,
   PointElement,
   LineElement,
   ArcElement,
   Legend,
   Tooltip
);
const labels = [
   "January",
   "February",
   "March",
   "April",
   "May",
   "June",
   "July",
   "August",
   "September",
   "October",
   "November",
   "December",
];
const data = {
   labels,
   datasets: [
      // {
      //    type: "line" as const,
      //    label: "Dataset 1",
      //    borderColor: "rgb(255, 99, 132)",
      //    borderWidth: 2,
      //    fill: false,
      //    data: [1, 3, 5, 4, 2, 3, 4],
      // },
      {
         type: "bar" as const,
         label: "Khách hàng",
         backgroundColor: "rgb(75, 192, 192)",
         data: [12, 30, 52, 70, 22, 30, 41],
         borderColor: "white",
         borderWidth: 2,
      },
      {
         type: "bar" as const,
         label: "Công việc",
         backgroundColor: "rgb(53, 162, 235)",
         data: [18, 30, 15, 44, 72, 32, 14],
      },
   ],
};

const options = {
   legend: {
      display: false,
      position: "right",
   },
   elements: {
      arc: {
         borderWidth: 0,
      },
   },
};
const Brief: React.FC<{
   title?: string | number;
   icon: ReactNode;
   color: string;
   amount: string;
}> = (props) => {
   return (
      <Panel className={classes.brief}>
         <div className={classes.amount}>
            <h1>{props.amount}</h1>
            <div className={`${classes.outerIcon}`} style={{ backgroundColor: props.color }}>
               {/* <AiOutlineUser /> */}
               {props.icon}
            </div>
         </div>
         <p className={classes.title}>{props.title}</p>
      </Panel>
   );
};
const Dashboard = () => {
   const dispatch = useDispatch();
   const [tasks, setTasks] = useState([]);
   const [taskChartData, setTaskChartDate] = useState({
      labels: [] as String[],
      datasets: [] as any,
   });
   const [barChartData, setBarChartData] = useState<any>({
      labels: [],
      datasets: [],
   });
   const [isLoadingTaskChart, setIsLoadingTaskChart] = useState<boolean>(true);
   useEffect(() => {
      dispatch(setPageTitle("Dashboard"));
   }, [dispatch]);
   useEffect(() => {
      const fetchTask = async () => {
         const date = new Date("2022-02-01"),
            y = date.getFullYear(),
            m = date.getMonth();
         var firstDay = new Date(y, m, 1);
         var lastDay = new Date(y, m + 1, 0);
         const response = await taskApi.getAll(`?from=${firstDay}&to=${lastDay}`);
         setTasks(response.data.results);
         setIsLoadingTaskChart(false);
         let doneCount = 0;
         let processingCount = 0;
         let cancelledCount = 0;
         let failCount = 0;
         let postponCount = 0;

         response.data.results.forEach((element: any) => {
            switch (element.status) {
               case "DONE":
                  doneCount += 1;
                  break;
               case "PROCESSING":
                  processingCount += 1;
                  break;
               case "POSTPONE":
                  cancelledCount += 1;
                  break;
               case "FAIL":
                  failCount += 1;
                  break;
               case "CANCELLED":
                  postponCount += 1;
                  break;
            }
         });

         const data = {
            labels: ["Done", "Processing", "Postpone", "Fail", "Cancelled"],
            datasets: [
               {
                  type: "doughnut" as const,
                  backgroundColor: [
                     "rgb(48, 197, 60)",
                     "rgb(54, 162, 235)",
                     "rgb(255, 205, 86)",
                     "rgb(214, 56, 38)",
                     "rgb(255, 136, 0)",
                  ],
                  data: [doneCount, processingCount, cancelledCount, failCount, postponCount],
               },
            ],
         };
         setTaskChartDate(data);
      };
      fetchTask();
   }, []);

   useEffect(() => {
      const fetchCustomer = async () => {
         const response = await customerApi.getAll("?year=2022");
         console.log(response.data);
         const data = {
            labels: labels,
            datasets: [
               {
                  type: "bar" as const,
                  label: "Khách hàng",
                  backgroundColor: "rgb(75, 192, 192)",
                  data: response.data.monthsIndex,
               },
               {
                  type: "bar" as const,
                  label: "Công việc",
                  backgroundColor: "rgb(53, 162, 235)",
                  data: response.data.monthsIndex,
               },
            ],
         };
         setBarChartData(data);
      };
      fetchCustomer();
   }, []);
   return (
      <div className={classes.dashboard}>
         <div className={classes.header}>
            <Brief amount="10" title="Online" icon={<AiOutlineUser />} color="rgb(48, 197, 60)" />
            <Brief amount="12+" title="Khách hàng" icon={<AiOutlineHeart />} color="#177cff" />
            <Brief
               amount={"" + tasks.length}
               title="Công việc"
               icon={<AiOutlineForm />}
               color="#9766ff"
            />
            <Brief amount="2" title="Nhân viên" icon={<AiOutlineForm />} color="#ff8800" />
         </div>
         <div className={classes.body}>
            <Panel className={classes["w-4"]}>
               <h3 className={classes.chartTitle}>Tiến trình công việc</h3>
               {isLoadingTaskChart ? (
                  <div className="loading">
                     <Oval color="#fff" height={50} width={50}></Oval>
                  </div>
               ) : (
                  <Doughnut data={taskChartData} options={options} />
               )}
            </Panel>
            <Panel className={classes["w-6"]}>
               <h3 className={classes.chartTitle}>Công việc</h3>
               <Chart type="bar" data={barChartData} />
            </Panel>
         </div>
         <div className={classes.body}>
            <Panel className={classes["w-5"]}>
               {/* <NewestCustomer /> */}
               <NewCustomer />
            </Panel>
            <Panel className={classes["w-5"]}>
               <NewTask />
            </Panel>
         </div>
      </div>
   );
};

export default Dashboard;
