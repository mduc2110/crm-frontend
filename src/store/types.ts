//ui
export const SET_LOADING = "SET_LOADING";
export const SET_PAGE_TITLE = "SET_PAGE_TITLE";

export interface UIState {
   isLoading: boolean;
   pageTitle: string;
}

export interface SetLoadingAction {
   type: typeof SET_LOADING;
}
export interface SetPageTitleAction {
   type: typeof SET_PAGE_TITLE;
   payload: string;
}

export type UIActions = typeof SET_LOADING | typeof SET_PAGE_TITLE;

export type UIActionType = SetLoadingAction | SetPageTitleAction;

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
export const ADD_LIST_CUSTOMER = "ADD_LIST_CUSTOMER";

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
export interface CustomerState {
   id: string;
   customerName: string;
   phone: string;
   email: string;
   birthday: string;
   gender: string;
   personalID: string;
   idProvince: string;
   idDistrict: string;
   idWard: string;
   detailAddress: string;

   customertag: {
      id: string;
      tagName: string;
   };
   customerstatus: {
      id: string;
      status: string;
   };
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

interface AddListCustomerAction {
   type: typeof ADD_LIST_CUSTOMER;
   payload: CustomerState[];
}

export type CustomerAction =
   | typeof GET_CUSTOMER
   | typeof CREATE_CUSTOMER
   | typeof ADD_LIST_CUSTOMER;

export type CustomerActionType =
   | GetCustomerAction
   | CreateCustomerAction
   | UpdateCustomerAction
   | DeleteCustomerAction
   | AddListCustomerAction;

//task
export const GET_TASK = "GET_TASK";
export const CREATE_TASK = "CREATE_TASK";
export const UPDATE_TASK = "UPDATE_TASK";
export const DELETE_TASK = "DELETE_TASK";

export interface TaskState {
   startTime: Date;
   endTime: Date;
   id: string;
   taskName: string;
   taskDescription: string;
   status: string;
   createdAt: Date;
   updatedAt: Date;
   user: {
      id: string;
      name: string;
   };
   customer: {
      customerName: string;
      id: string;
   };
   tasktype: {
      nameType: string;
      id: string;
   };
}

interface GetTaskAction {
   type: typeof GET_TASK;
   payload: TaskState[];
}
interface CreateTaskAction {
   type: typeof CREATE_TASK;
   payload: TaskState;
}
interface UpdateTaskAction {
   type: typeof UPDATE_TASK;
   payload: TaskState;
}
interface DeleteTaskAction {
   type: typeof DELETE_TASK;
   payload: string;
}

export type TaskAction =
   | typeof GET_TASK
   | typeof CREATE_TASK
   | typeof UPDATE_TASK
   | typeof DELETE_TASK;

export type TaskActionType = GetTaskAction | CreateTaskAction | UpdateTaskAction | DeleteTaskAction;

//USER

export const GET_USER = "GET_USER";
export const CREATE_USER = "CREATE_USER";
export const UPDATE_USER = "UPDATE_USER";
export const DELETE_USER = "DELETE_USER";

export interface UserState {
   id: string;
   username: string;
   email: string | undefined;
   active: boolean;
   phone: string;
   name: string;
   deptId: string;
   roleId: string;
   dept: {
      id: string;
      departmentName: string;
   };
   role: {
      id: string;
      description: string;
   };
}
interface GetUserAction {
   type: typeof GET_USER;
   payload: UserState[];
}
interface CreateUserAction {
   type: typeof CREATE_USER;
   payload: UserState;
}
interface UpdateUserAction {
   type: typeof UPDATE_USER;
   payload: UserState;
}
interface DeleteUserAction {
   type: typeof DELETE_USER;
   payload: string;
}

export type UserAction =
   | typeof GET_USER
   | typeof CREATE_USER
   | typeof UPDATE_USER
   | typeof DELETE_USER;

export type UserActionType = GetUserAction | CreateUserAction | UpdateUserAction | DeleteUserAction;
