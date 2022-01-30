import { CustomerState } from "../store/types";
import axiosClient from "./axiosClient";

const customerApi = {
   getAll(queryString?: string) {
      const query = queryString || "";
      const url = "/customers" + query;
      return axiosClient.get(url);
   },
   //  getByUser() {
   //      const url = `api/orders/orders`;
   //      return axiosClient.get(url);
   //  },
   create(data: CustomerState) {
      const url = "/customers";
      return axiosClient.post(url, data);
   },
   remove(data: object = {}) {
      // const body = data || []
      const url = `/customers`;
      console.log(data);

      return axiosClient.delete(url, data);
   },

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
export default customerApi;