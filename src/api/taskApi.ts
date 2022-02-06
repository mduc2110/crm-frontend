import { Task } from "../components/Modals/TaskModal";
import axiosClient from "./axiosClient";

const taskApi = {
   getAll(queryString?: string) {
      const query = queryString || "";
      const url = "/tasks" + query;
      return axiosClient.get(url);
   },
   getOne(id: string) {
      const url = "/tasks/" + id;
      return axiosClient.get(url);
   },
   remove(id: string) {
      const url = "/tasks/" + id;
      return axiosClient.delete(url);
   },
   getTaskFilter() {
      const url = "/tasks_types";
      return axiosClient.get(url);
   },
   create(data: Task) {
      const url = "/tasks";
      return axiosClient.post(url, data);
   },
};
export default taskApi;
