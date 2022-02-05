import { AuthActionTypes, AuthState, UserAuth, SIGN_IN, SIGN_OUT } from "../store/types";

const isSignIned = (): boolean => {
   const token = localStorage.getItem("token");
   const token_expire = localStorage.getItem("token_expire");
   const user = localStorage.getItem("user");
   const isAuth = token && token_expire && user ? true : false;
   if (!isAuth) {
      localStorage.clear();
   }
   return isAuth;
};

const setToken = (token: any) => {
   localStorage.setItem("token", token);
};
export const getToken = (): string | undefined => {
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

const setUser = (user: any) => {
   localStorage.setItem("user", JSON.stringify(user));
};
const getUser = () => {
   const userJson = localStorage.getItem("user");
   const user: UserAuth | null = JSON.parse(userJson as string);

   return user ? user : undefined;
};

const clearStorage = () => {
   localStorage.clear();
};
export const authReducer = (
   state: AuthState = {
      isFetching: false,
      isAuthenticated: isSignIned(),
      token: getToken(),
      token_expire: getTokenExpire(),
      user: getUser(),
   },
   action: AuthActionTypes
) => {
   switch (action.type) {
      case SIGN_IN:
         setToken(action.payload.token);
         setTokenExpire(action.payload.token_expire);
         setUser(action.payload.user);

         return {
            ...state,
            isAuthenticated: true,
            token: action.payload.token,
            permissions: action.payload.user.permissions,
            token_expire: action.payload.token_expire,
            user: action.payload.user,
         };
      case SIGN_OUT:
         clearStorage();
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
