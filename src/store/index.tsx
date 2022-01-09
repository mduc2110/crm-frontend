import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import thunk from "redux-thunk";
import { authReducer } from "../reducers/auth";
import { AuthState } from "./types";

const rootReducer = combineReducers({
   auth: authReducer,
});

// export const configureStore = () => {
//    const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
//    return store;
// };
const store = createStore(rootReducer, compose(applyMiddleware(thunk)));
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type DisPatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<DisPatch>();
