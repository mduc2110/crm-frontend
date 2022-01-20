import userApi from "../api/userApi";
import { SIGN_IN } from "../store/types";

export function signIn(result?: any) {
   return {
      type: SIGN_IN,
      payload: result,
   };
}

export const auth = (data: { username: string; password: string }) => async (dispatch: any) => {
   try {
      const response = await userApi.login(data);
      dispatch({
         type: SIGN_IN,
         payload: response.data,
      });
   } catch (error) {
      console.log(error);
   }
};
