import React from "react";
import { Navigate, Outlet, RouteProps } from "react-router-dom";

export type ProtectedRouteProps = {
   isAuthenticated: boolean;
   authenticationPath: string;
   redirectPath: string;
   component: any;
} & RouteProps;

const ProtectedRoute = ({ isAuthenticated, redirectPath }: ProtectedRouteProps) => {
   // const currentLocation = useLocation();

   // return <Route {...routeProps} element={children} />;
   return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
