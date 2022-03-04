import { SET_LOADING, SET_PAGE_TITLE, TOGGLE_SIDEBAR, UIActionType, UIState } from "../store/types";

export const uiReducer = (
   state: UIState = {
      isLoading: false,
      pageTitle: "",
      toggleSideBar: false,
   },
   action: UIActionType
) => {
   switch (action.type) {
      case SET_LOADING:
         return { ...state, isLoading: !state.isLoading };
      case TOGGLE_SIDEBAR:
         return { ...state, toggleSideBar: !state.toggleSideBar };
      case SET_PAGE_TITLE:
         return { ...state, pageTitle: action.payload };
      default:
         return state;
   }
};
