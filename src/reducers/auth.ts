import { AuthActionTypes, AuthState, SIGN_IN, SIGN_OUT } from "../store/types";

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
const removeToken = () => {
   localStorage.removeItem("token");
};
export const authReducer = (
   state: AuthState = {
      isFetching: false,
      isAuthenticated: isSignIned(),
      token: getToken(),
      permissions: [],
   },
   action: AuthActionTypes
) => {
   switch (action.type) {
      case SIGN_IN:
         setToken(action.payload.token);
         return {
            ...state,
            isAuthenticated: true,
            token: action.payload.token,
            permissions: action.payload.user.permissions,
         };
      case SIGN_OUT:
         removeToken();
         return {
            ...state,
            isAuthenticated: false,
            token: "",
            permissions: [],
         };

      default:
         return state;
   }
};
