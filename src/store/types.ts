//auth
export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export interface UserAuth {
   id: number;
   name: string;
   emai: string;
   permissions: string[];
}

export interface AuthState {
   isFetching: boolean;
   user: undefined | null | UserAuth;
   // name: string;
   token: string | undefined | null;
   isAuthenticated: boolean;
   errorMessage?: null;
   token_expire: number | undefined | null;
}

interface SignInAction {
   type: typeof SIGN_IN;
   payload: {
      token?: string;
      token_expire: string;
      user: {
         permissions?: string[];
         id: number;
         name: number;
      };
      name: string;
   };
   error?: string;
}

interface SignOutAction {
   type: typeof SIGN_OUT;
   payload: { token?: string };
   error?: string;
}

export type AuthActionTypes = SignInAction | SignOutAction;

export type AuthActions = typeof SIGN_IN | typeof SIGN_OUT;

//customer
export const GET_CUSTOMER = "GET_CUSTOMER";
export const CREATE_CUSTOMER = "CREATE_CUSTOMER";
export const UPDATE_CUSTOMER = "UPDATE_CUSTOMER";
export const DELETE_CUSTOMER = "DELETE_CUSTOMER";

export interface CustomerState {
   id: string;
   customerName: string;
   phone: string;
   email: string;
   birthday: string;
   gender: string;
   personalID: string;
   idStatus: string;
   idTag: string;
   idProvince: string;
   idDistrict: string;
   idWard: string;
   detailAddress: string;
}

interface GetCustomerAction {
   type: typeof GET_CUSTOMER;
   payload: CustomerState[];
}
interface CreateCustomerAction {
   type: typeof CREATE_CUSTOMER;
   payload: CustomerState;
}
interface UpdateCustomerAction {
   type: typeof UPDATE_CUSTOMER;
   payload: { customer: CustomerState };
}
interface DeleteCustomerAction {
   type: typeof DELETE_CUSTOMER;
   payload: string[];
}

export type CustomerAction = typeof GET_CUSTOMER | typeof CREATE_CUSTOMER;

export type CustomerActionType =
   | GetCustomerAction
   | CreateCustomerAction
   | UpdateCustomerAction
   | DeleteCustomerAction;
