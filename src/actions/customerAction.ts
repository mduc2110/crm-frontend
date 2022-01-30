import { Dispatch } from "redux";
import customerApi from "../api/customerApi";
import { CREATE_CUSTOMER, CustomerState, DELETE_CUSTOMER, GET_CUSTOMER } from "../store/types";

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

export const addCustomer = (data: CustomerState) => async (dispatch: Dispatch) => {
   try {
      const response = await customerApi.create(data);
      dispatch({
         type: CREATE_CUSTOMER,
         payload: response.data,
      });
   } catch (error) {
      console.log(error);
   }
};

export const deleteCustomer = (idList: string[]) => async (dispatch: Dispatch) => {
   try {
      const data = {
         customerIdArray: idList,
      };
      await customerApi.remove(data);
      dispatch({
         type: DELETE_CUSTOMER,
         payload: idList,
      });
   } catch (error) {
      console.log(error);
   }
};