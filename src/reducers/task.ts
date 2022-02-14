import {
   CREATE_TASK,
   DELETE_TASK,
   GET_TASK,
   TaskActionType,
   TaskState,
   UPDATE_TASK,
} from "../store/types";

export const taskReducer = (state: TaskState[] = [], action: TaskActionType) => {
   switch (action.type) {
      case GET_TASK:
         return action.payload;
      case CREATE_TASK:
         return [...state, action.payload];
      case UPDATE_TASK:
         const task = action.payload;
         const index = state.findIndex((item) => item.id === task.id);
         const updatedList = [...state];
         updatedList[index] = task;
         return updatedList;
      case DELETE_TASK:
         const id = action.payload;
         return [...state].filter((task) => id !== task.id);
      default:
         return state;
   }
};
