import { Dispatch } from "redux";
import { SET_LOADING } from "../store/types";

export const setloading = () => (dispatch: Dispatch) => {
   dispatch({
      type: SET_LOADING,
   });
};
