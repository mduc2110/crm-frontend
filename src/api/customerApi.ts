import { CustomerState } from "../store/types";
import axiosClient from "./axiosClient";

const customerApi = {
   getAll(queryString?: string) {
      const query = queryString || "";
      const url = "/customers" + query;
      // const url = ("/customers" + queryString) as string;
      return axiosClient.get(url);
   },
   create(data: CustomerState) {
      const url = "/customers";
      return axiosClient.post(url, data);
   },
   remove(data: string[]) {
      const d = {
         customerIdArray: data,
      };
      const url = `/customers`;
      console.log(data);
      return axiosClient.delete(url, { data: d });
   },
   uploads(data: any) {
      const url = `/customers/uploads`;
      console.log(data);
      return axiosClient.post(url, data);
   },
};
export default customerApi;
