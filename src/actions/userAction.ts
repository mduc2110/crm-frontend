import { toast } from "react-toastify";
import { Dispatch } from "redux";
import userApi from "../api/userApi";
import { CREATE_USER, DELETE_USER, GET_USER, UserState } from "../store/types";
import { UserPostData } from "../types";

export const getAllUser = (queryString?: string) => async (dispatch: Dispatch) => {
   try {
      const response = await userApi.getAll(queryString as string);
      dispatch({
         type: GET_USER,
         payload: response.data.results,
      });
   } catch (error) {
      console.log(error);
   }
};

export const addUser = (data: UserPostData) => async (dispatch: Dispatch) => {
   try {
      const response = await userApi.create(data);
      const payload: UserState = response.data;
      dispatch({
         type: CREATE_USER,
         payload: payload,
      });
      toast.success("Thêm thành công");
   } catch (error: any) {
      // console.log(error.response.data.message);

      toast.error(error.response.data.message);
   }
};

export const deleteUser = (id: string) => async (dispatch: Dispatch) => {
   try {
      await userApi.remove(id);
      dispatch({
         type: DELETE_USER,
         payload: id,
      });
   } catch (error) {
      console.log(error);
   }
};
