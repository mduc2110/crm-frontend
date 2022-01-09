import { AuthActionTypes, AuthState, SIGN_IN } from "../store/types";

const isSignIned = (): boolean => {
   const token = localStorage.getItem("token");
   return token ? true : false;
};

const setToken = (token: any) => {
   localStorage.setItem("token", token);
};
const getToken = (): string | undefined => {
   const token = localStorage.getItem("token");
   return token ? token : undefined;
};

export const authReducer = (
   state: AuthState = {
      isFetching: false,
      isAuthenticated: isSignIned(),
      token: getToken(),
   },
   action: AuthActionTypes
) => {
   switch (action.type) {
      case SIGN_IN:
         setToken(action.payload.token);
         return {
            ...state,
            isFetching: false,
            isAuthenticated: true,
            errorMessage: "",
            token: action.payload.token,
         };

      default:
         return state;
   }
};
