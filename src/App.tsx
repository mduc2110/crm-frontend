import React, { useEffect } from "react";
import "./App.css";
import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import ProtectedRoute from "./pages/ProtectedRoute";
import { useDispatch } from "react-redux";
import { useAppSelector } from "./store";
import { AuthState } from "./store/types";
import { logout } from "./actions/auth";
import "./styles/commonStyle/common.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
   const authState: AuthState = useAppSelector((state) => state.auth);
   const uiState = useAppSelector((state) => state.ui);
   const dispatch = useDispatch();
   const navigate = useNavigate();
   const location = useLocation();

   // console.log(authState);

   useEffect(() => {
      const timeRemaining = authState.token_expire;
      if (timeRemaining && timeRemaining - Date.now() < 0) {
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
         <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
         />
         {uiState.isLoading && <div className="loading-overlay"></div>}

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
