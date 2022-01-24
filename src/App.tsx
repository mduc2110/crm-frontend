import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute, { ProtectedRouteProps } from "./pages/ProtectedRoute";
import { useDispatch, useSelector } from "react-redux";
import { useAppSelector } from "./store";
import { AuthState } from "./store/types";
import { getTokenExpire } from "./reducers/auth";
import { logout } from "./actions/auth";
function App() {
   const authState: AuthState = useAppSelector((state) => state.auth);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   console.log(authState);

   useEffect(() => {
      const expireTime = authState.token_expire;
      if (expireTime && expireTime - Date.now() < 0) {
         console.log(expireTime - Date.now());
         dispatch(logout());
      }
      if (!authState.isAuthenticated && location.pathname !== "/login") {
         navigate("/login");
      }
   }, [authState, navigate, location.pathname, dispatch]);
   // const auth : AuthState = useSelector(state => state.auth);
   return (
      <div className="App">
         {authState.isAuthenticated ?? <Navigate to="/" />}
         <Routes>
            <Route
               path="/"
               element={
                  <ProtectedRoute
                     authenticationPath="/login"
                     isAuthenticated={authState.isAuthenticated}
                     redirectPath="/login"
                     component={<HomePage />}
                  />
               }
            >
               <Route path="/" element={<Navigate to="/dashboard" />} />
               <Route path="/*" element={<HomePage />} />
               {/* <Route path="/customer" element={<div>Customer</div>} /> */}
            </Route>
            {/* <Route path="/" element={<HomePage />} />
            <Route path="/customer" element={<div>Customer</div>} /> */}

            <Route path="/login" element={<LoginPage />} />
         </Routes>
      </div>
   );
}

export default App;
