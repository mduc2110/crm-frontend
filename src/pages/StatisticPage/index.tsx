import React, { useEffect, useState } from "react";
import classes from "./statisticPage.module.css";
import serviceApi from "../../api/servicesApi";
import Panel from "../../components/UI/Panel";
import { Chart } from "react-chartjs-2";
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
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../actions/uiAction";
import { AiOutlineDatabase } from "react-icons/ai";
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
const StatisticPage = () => {
   const [emailList, setEmailList] = useState<string[]>([]);
   const dispatch = useDispatch();
   const [dataChart, setDataChart] = useState<any>({
      labels: [],
      datasets: [],
   });

   useEffect(() => {
      dispatch(setPageTitle("Thống kê"));
   }, [dispatch]);

   useEffect(() => {
      const fetchEmail = async () => {
         const response = await serviceApi.getAllEmail();
         // console.log(response.data);
         setEmailList(response.data);
      };
      fetchEmail();
   }, []);

   const getStatusHandler = async (email: string) => {
      try {
         const result = await serviceApi.getHistoryStatus(email);
         console.log(result.data);

         const data = {
            labels: Object.keys(result.data),
            datasets: [
               {
                  type: "bar" as const,
                  label: email,
                  backgroundColor: "rgb(53, 162, 235)",
                  data: Object.values(result.data),
               },
            ],
         };
         setDataChart(data);
      } catch (error) {}
   };
   return (
      <div className={classes.statisticPage}>
         <div className={classes.inner}>
            <Panel className={classes.left}>
               <h3>Danh sách email</h3>
               <ul>
                  {emailList?.map((item, index) => (
                     <li key={index} onClick={() => getStatusHandler(item)}>
                        {item}
                     </li>
                  ))}
               </ul>
            </Panel>
            <Panel className={classes.right}>
               {dataChart.datasets.length !== 0 ? (
                  <Chart type="bar" data={dataChart} />
               ) : (
                  <div className="noData">
                     <AiOutlineDatabase />
                     <span>No data found</span>
                  </div>
               )}
            </Panel>
         </div>
      </div>
   );
};

export default StatisticPage;
