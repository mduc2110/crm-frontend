import { EmailInterface } from "../pages/CampaginPage";
import axiosClient from "./axiosClient";

const serviceApi = {
   sendEmail(data: EmailInterface) {
      const url = "/sendMail";
      return axiosClient.post(url, data);
   },
   getAllEmail() {
      const url = "/mail";
      return axiosClient.get(url);
   },
   getHistoryStatus(email: string) {
      const url = "/mail/" + email;
      return axiosClient.get(url);
   },
};
export default serviceApi;
