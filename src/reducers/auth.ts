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
const setTokenExpire = (token_expire: any) => {
   localStorage.setItem("token_expire", token_expire);
};
export const getTokenExpire = () => {
   const tokenExpire = localStorage.getItem("token_expire");
   return tokenExpire ? +tokenExpire : undefined;
};
const removeTokenExpire = () => {
   localStorage.removeItem("token_expire");
};
export const authReducer = (
   state: AuthState = {
      isFetching: false,
      isAuthenticated: isSignIned(),
      token: getToken(),
      permissions: [],
      token_expire: getTokenExpire(),
   },
   action: AuthActionTypes
) => {
   switch (action.type) {
      case SIGN_IN:
         setToken(action.payload.token);
         setTokenExpire(action.payload.token_expire);
         return {
            ...state,
            isAuthenticated: true,
            token: action.payload.token,
            permissions: action.payload.user.permissions,
            token_expire: action.payload.token_expire,
         };
      case SIGN_OUT:
         removeToken();
         removeTokenExpire();
         return {
            ...state,
            isAuthenticated: false,
            token: "",
            permissions: [],
            token_expire: null,
         };

      default:
         return state;
   }
};
