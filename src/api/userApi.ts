import axiosClient from "./axiosClient";

const userApi = {
   getAll() {
      const url = "/api/orders";
      return axiosClient.get(url);
   },
   login(data: { username: string; password: string }) {
      const url = "/api/v1/user/login";
      return axiosClient.post(url, data);
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
