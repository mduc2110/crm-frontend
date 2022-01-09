import React, { Component, useEffect } from "react";
import { Navigate, Outlet, Route, RouteProps, useLocation } from "react-router-dom";

export type ProtectedRouteProps = {
   isAuthenticated: boolean;
   authenticationPath: string;
   redirectPath: string;
   component: any;
} & RouteProps;

const ProtectedRoute = ({ children, isAuthenticated, authenticationPath, redirectPath, ...routeProps }: ProtectedRouteProps) => {
   // const currentLocation = useLocation();

   // return <Route {...routeProps} element={children} />;
   return isAuthenticated ? <Outlet /> : <Navigate to={redirectPath} />;
};

export default ProtectedRoute;
