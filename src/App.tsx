import React, { useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute, { ProtectedRouteProps } from "./pages/ProtectedRoute";
import { useSelector } from "react-redux";
import { useAppSelector } from "./store";
import { AuthState } from "./store/types";
function App() {
   const authState: AuthState = useAppSelector((state) => state.auth);
   const navigate = useNavigate();
   console.log(authState);
   // if (authState.isAuthenticated) {
   //    navigate("/");
   // }
   useEffect(() => {
      if (authState.isAuthenticated) {
         navigate("/dashboard");
      }
   }, [authState.isAuthenticated, navigate]);
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
               <Route path="/*" element={<HomePage />} />
            </Route>
            {/* <Route path="/" element={<HomePage />} /> */}

            <Route path="/login" element={<LoginPage />} />
         </Routes>
      </div>
   );
}

export default App;
