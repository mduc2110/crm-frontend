import { toast } from "react-toastify";
import { Dispatch } from "redux";
import customerApi from "../api/customerApi";
import { ADD_LIST_CUSTOMER, CREATE_CUSTOMER, DELETE_CUSTOMER, GET_CUSTOMER } from "../store/types";
import { CustomerPostData } from "../types";

export const getCustomer = (queryString?: string) => async (dispatch: Dispatch) => {
   try {
      const response = await customerApi.getAll(queryString);
      dispatch({
         type: GET_CUSTOMER,
         payload: response.data.results,
      });
   } catch (error) {
      console.log(error);
   }
};

export const addCustomer = (data: CustomerPostData) => async (dispatch: Dispatch) => {
   try {
      const response = await customerApi.create(data);

      dispatch({
         type: CREATE_CUSTOMER,
         payload: response.data,
      });
      toast.success("Thêm thành công");
   } catch (error: any) {
      toast.error(error.response.data.message);
   }
};

export const deleteCustomer = (idList: string[]) => async (dispatch: Dispatch) => {
   try {
      await customerApi.remove(idList);

      dispatch({
         type: DELETE_CUSTOMER,
         payload: idList,
      });
   } catch (error) {
      console.log(error);
   }
};

export const uploadFileCustomer = (data: any) => async (dispatch: Dispatch) => {
   try {
      const response = await customerApi.uploads(data);

      dispatch({
         type: ADD_LIST_CUSTOMER,
         payload: response.data,
      });
      toast.success(`Thêm thành công ${response.data.length} khách hàng`);
   } catch (error: any) {
      toast.error(error.response.data.message);
   }
};

export const updateCustomer =
   (data: CustomerPostData, id: string) => async (dispatch: Dispatch) => {
      try {
         const response = await customerApi.update(data, id);
         console.log(response.data);

         toast.success("Cập nhật thành công");
      } catch (error) {
         toast.error("Cập nhật thất bại!");
      }
   };
