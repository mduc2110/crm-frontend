import { CustomerPostData } from "../types";
import axiosClient from "./axiosClient";

const customerApi = {
   getAll(queryString?: string) {
      const query = queryString || "";
      const url = "/customers" + query;
      // const url = ("/customers" + queryString) as string;
      return axiosClient.get(url);
   },
   getOne(id: string) {
      const url = "/customers/" + id;
      return axiosClient.get(url);
   },
   create(data: CustomerPostData) {
      const url = "/customers";
      return axiosClient.post(url, data);
   },
   update(data: CustomerPostData, id: string) {
      const url = "/customers/" + id;
      return axiosClient.put(url, data);
   },
   remove(data: string[]) {
      const d = {
         customerIdArray: data,
      };
      const url = `/customers`;
      return axiosClient.delete(url, { data: d });
   },
   uploads(data: any) {
      const url = `/customers/uploads`;
      return axiosClient.post(url, data);
   },
   // download() {
   //    const url = "/file-download";
   //    return axiosClient
   // }
   getAllCustomerTag() {
      const url = `/customer_tags`;
      return axiosClient.get(url);
   },
   getAllCustomerStatus() {
      const url = `/customer_status`;
      return axiosClient.get(url);
   },
};
export default customerApi;
