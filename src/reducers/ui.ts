import { SET_LOADING, SET_PAGE_TITLE, UIActionType, UIState } from "../store/types";

export const uiReducer = (
   state: UIState = {
      isLoading: false,
      pageTitle: "",
   },
   action: UIActionType
) => {
   switch (action.type) {
      case SET_LOADING:
         return { ...state, isLoading: !state.isLoading };
      case SET_PAGE_TITLE:
         return { ...state, pageTitle: action.payload };
      default:
         return state;
   }
};
