import { Dispatch } from "redux";
import userApi from "../api/userApi";
import { CREATE_USER, DELETE_USER, GET_USER, UserState } from "../store/types";

export const getAllUser = (queryString?: string) => async (dispatch: Dispatch) => {
   try {
      const response = await userApi.getAll(queryString as string);
      console.log(response);

      dispatch({
         type: GET_USER,
         payload: response.data.results,
      });
   } catch (error) {
      console.log(error);
   }
};

export const addUser = (data: UserState) => async (dispatch: Dispatch) => {
   try {
      const response = await userApi.create(data);
      dispatch({
         type: CREATE_USER,
         payload: response.data,
      });
   } catch (error) {
      console.log(error);
   }
};

export const deleteUser = (idList: string) => async (dispatch: Dispatch) => {
   try {
      await userApi.remove(idList);
      dispatch({
         type: DELETE_USER,
         payload: idList,
      });
   } catch (error) {
      console.log(error);
   }
};
