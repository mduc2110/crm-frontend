export const SIGN_IN = "SIGN_IN";
export const SIGN_OUT = "SIGN_OUT";

export interface AuthState {
   isFetching: boolean;
   // user: User;
   token: string | undefined | null;
   isAuthenticated: boolean;
   errorMessage?: null;
   permissions: [];
   token_expire: number | undefined | null;
}

interface SignInAction {
   type: typeof SIGN_IN;
   payload: {
      token?: string;
      token_expire: string;
      user: {
         permissions?: [];
         id: number;
         name: number;
      };
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
