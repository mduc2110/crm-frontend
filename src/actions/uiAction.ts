import { Dispatch } from "redux";
import { SET_LOADING, SET_PAGE_TITLE } from "../store/types";

export const setloading = () => (dispatch: Dispatch) => {
   dispatch({
      type: SET_LOADING,
   });
};
export const setPageTitle = (title: string) => (dispatch: Dispatch) => {
   dispatch({
      type: SET_PAGE_TITLE,
      payload: title,
   });
};
