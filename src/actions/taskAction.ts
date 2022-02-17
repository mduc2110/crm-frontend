import { toast } from "react-toastify";
import { Dispatch } from "redux";
import taskApi from "../api/taskApi";
import { CREATE_TASK, DELETE_TASK, GET_TASK, UPDATE_TASK } from "../store/types";
import { TaskPostData } from "../types";

export const getAllTask = (queryString?: string) => async (dispatch: Dispatch) => {
   try {
      const response = await taskApi.getAll(queryString);

      dispatch({
         type: GET_TASK,
         payload: response.data.results,
      });
   } catch (error: any) {
      console.log(error.message);
   }
};

export const createTask = (data: TaskPostData) => async (dispatch: Dispatch) => {
   try {
      const response = await taskApi.create(data);

      dispatch({
         type: CREATE_TASK,
         payload: response.data,
      });
      toast.success("Thêm công việc thành công");
   } catch (error: any) {
      toast.error(error.response.data.message);
      // return error.response.status;
   }
};

export const updateTask = (id: string, data: TaskPostData) => async (dispatch: Dispatch) => {
   try {
      const response = await taskApi.update(id, data);

      dispatch({
         type: UPDATE_TASK,
         payload: response.data,
      });
      toast.success("Chỉnh sửa công việc thành công");
   } catch (error: any) {
      toast.error(error.response.data.message);
      // return error.response.status;
   }
};
export const deleteTask = (id: string) => async (dispatch: Dispatch) => {
   try {
      const response = await taskApi.remove(id);

      dispatch({
         type: DELETE_TASK,
         payload: response.data,
      });
      // toast.success("Xóa thành công");
   } catch (error: any) {
      toast.error(error.response.data.message);
      // return error.response.status;
   }
};
