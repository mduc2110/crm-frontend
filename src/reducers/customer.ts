import {
   CREATE_CUSTOMER,
   CustomerActionType,
   CustomerState,
   DELETE_CUSTOMER,
   GET_CUSTOMER,
   UPDATE_CUSTOMER,
} from "../store/types";

export const customerReducer = (state: CustomerState[] = [], action: CustomerActionType) => {
   switch (action.type) {
      case GET_CUSTOMER:
         return action.payload;
      case CREATE_CUSTOMER:
         return [...state, action.payload];
      case UPDATE_CUSTOMER:
         const { customer } = action.payload;
         const index = state.findIndex((item) => item.id === customer.id);
         const updatedList = [...state];
         updatedList[index] = customer;
         return updatedList;
      case DELETE_CUSTOMER:
         const deleteđIdArry = action.payload;
         return [...state].filter((customer) => deleteđIdArry.includes(customer.id));
      default:
         return state;
   }
};
