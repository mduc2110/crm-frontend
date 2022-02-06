import { Dispatch } from "redux";
import taskApi from "../api/taskApi";
import { GET_TASK } from "../store/types";

export const getAllTask = (queryString?: string) => async (dispatch: Dispatch) => {
   try {
      const response = await taskApi.getAll(queryString);
      dispatch({
         type: GET_TASK,
         payload: response.data.results,
      });
   } catch (error) {
      console.log(error);
   }
};
