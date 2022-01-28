import axiosClient from "./axiosClient";

const customerApi = {
   getAll() {
      const url = "/customers";
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
export default customerApi;
