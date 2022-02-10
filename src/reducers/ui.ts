import { SET_LOADING, UIActionType } from "../store/types";

export const uiReducer = (
   state: { isLoading: boolean } = {
      isLoading: false,
   },
   action: UIActionType
) => {
   switch (action.type) {
      case SET_LOADING:
         return { ...state, isLoading: !state.isLoading };
      default:
         return state;
   }
};
