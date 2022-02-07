import {
   UserState,
   UserActionType,
   GET_USER,
   CREATE_USER,
   UPDATE_USER,
   DELETE_USER,
} from "../store/types";

export const userReducer = (state: UserState[] = [], action: UserActionType) => {
   switch (action.type) {
      case GET_USER:
         return action.payload;
      case CREATE_USER:
         return [...state, action.payload];
      case UPDATE_USER:
         const user = action.payload;
         const index = state.findIndex((item) => item.id === user.id);
         const updatedList = [...state];
         updatedList[index] = user;
         return updatedList;
      case DELETE_USER:
         const deleteđIdArry = action.payload;
         return [...state].filter((user) => !deleteđIdArry.includes(user.id));
      default:
         return state;
   }
};
