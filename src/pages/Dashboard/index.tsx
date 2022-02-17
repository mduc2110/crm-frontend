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
const labels = ["January", "February", "March", "April", "May", "June", "July"];
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
const doughnutData = {
   maintainAspectRatio: false,
   responsive: false,
   labels: ["Done", "Processing", "Cancelled", "Fail"],
   datasets: [
      {
         data: [300, 50, 100, 50],
         backgroundColor: [
            "rgb(48, 197, 60)",
            "rgb(54, 162, 235)",
            "rgb(255, 205, 86)",
            "rgb(214, 56, 38)",
         ],
         hoverOffset: 4,
      },
   ],
};
const Brief: React.FC<{
   title?: string;
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
   useEffect(() => {
      dispatch(setPageTitle("Dashboard"));
   }, [dispatch]);
   return (
      <div className={classes.dashboard}>
         <div className={classes.header}>
            <Brief amount="10" title="Online" icon={<AiOutlineUser />} color="rgb(48, 197, 60)" />
            <Brief amount="12+" title="Khách hàng" icon={<AiOutlineHeart />} color="#177cff" />
            <Brief amount="8" title="Công việc" icon={<AiOutlineForm />} color="#9766ff" />
            <Brief amount="2" title="Nhân viên" icon={<AiOutlineForm />} color="#ff8800" />
         </div>
         <div className={classes.body}>
            <Panel className={classes["w-4"]}>
               <h3 className={classes.chartTitle}>Tiến trình công việc</h3>
               <Doughnut data={doughnutData} options={options} />
            </Panel>
            <Panel className={classes["w-6"]}>
               <h3 className={classes.chartTitle}>Công việc</h3>
               <Chart type="bar" data={data} />
            </Panel>
         </div>
         <div className={classes.body}>
            <Panel className={classes["w-6"]}>
               {/* <NewestCustomer /> */}
               <NewCustomer />
            </Panel>
         </div>
      </div>
   );
};

export default Dashboard;
