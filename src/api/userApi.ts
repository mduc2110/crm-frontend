import { UserPostData } from "../types";
import axiosClient from "./axiosClient";

const userApi = {
   getAll(queryString: string) {
      const query = queryString || "";
      const url = "/users" + query;
      return axiosClient.get(url);
   },
   login(data: { username: string; password: string }) {
      const url = "/users/login";
      return axiosClient.post(url, data);
   },
   getOne(id: string) {
      const url = "/users/" + id;
      return axiosClient.get(url);
   },
   remove(id: string) {
      const url = "/users/" + id;
      return axiosClient.delete(url);
   },
   create(data: UserPostData) {
      const url = "/users/";
      return axiosClient.post(url, data);
   },

   getAllDept() {
      const url = "/depts/";
      return axiosClient.get(url);
   },
   //  getByUser() {
   //      const url = `api/orders/orders`;
   //      return axiosClient.get(url);
   //  },
   //  create(data) {
   //      const url = '/api/orders';
   //      return axiosClient.post(url, data);
   //  },
   //  createShipping(data) {
   //      const url = '/api/orders/order-create';
   //      return axiosClient.post(url, data);
   //  },
   //  update(data) {
   //      const url = `/api/orders/${data._id}`;
   //      return axiosClient.patch(url, data);
   //  },
   //  remove(id) {
   //      const url = `/api/orders/${id}`;
   //      return axiosClient.patch(url);
   //  }
};
export default userApi;
