import { Role } from "../types";
import axiosClient from "./axiosClient";

const roleApi = {
   getAll(queryString?: string) {
      const query = queryString || "";
      const url = "/roles" + query;
      return axiosClient.get(url);
   },
   getOne(id: string) {
      const url = "/roles/" + id;
      return axiosClient.get(url);
   },
   remove(id: string) {
      const url = "/roles/" + id;
      return axiosClient.delete(url);
   },
   create(data: Role) {
      const url = "/roles";
      return axiosClient.post(url, data);
   },
};
export default roleApi;
