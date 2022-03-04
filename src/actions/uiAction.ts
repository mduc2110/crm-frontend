import { Dispatch } from "redux";
import { SET_LOADING, SET_PAGE_TITLE, TOGGLE_SIDEBAR } from "../store/types";

export const setloading = () => (dispatch: Dispatch) => {
   dispatch({
      type: SET_LOADING,
   });
};
export const toggleSidebar = () => (dispatch: Dispatch) => {
   dispatch({
      type: TOGGLE_SIDEBAR,
   });
};
export const setPageTitle = (title: string) => (dispatch: Dispatch) => {
   dispatch({
      type: SET_PAGE_TITLE,
      payload: title,
   });
};
