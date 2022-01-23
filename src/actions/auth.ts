import { Dispatch } from "redux";
import userApi from "../api/userApi";
import { AuthActionTypes, SIGN_IN, SIGN_OUT } from "../store/types";

export function signIn(result?: any) {
   return {
      type: SIGN_IN,
      payload: result,
   };
}

export const auth =
   (data: { username: string; password: string }) => async (dispatch: Dispatch) => {
      try {
         const response = await userApi.login(data);
         console.log(response);
         dispatch({
            type: SIGN_IN,
            payload: response.data,
         });
      } catch (error) {
         console.log(error);
      }
   };

export const logout = () => (dispatch: any) => {
   dispatch({
      type: SIGN_OUT,
   });
};
