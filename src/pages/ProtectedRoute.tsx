import React, { useEffect } from "react";
import { Navigate, Route, RouteProps, useLocation } from "react-router-dom";

export type ProtectedRouteProps = {
   isAuthenticated: boolean;
   authenticationPath: string;
   redirectPath: string;
   setRedirectPath: (path: string) => void;
} & RouteProps;

const ProtectedRoute = ({ isAuthenticated, authenticationPath, redirectPath, setRedirectPath, ...routeProps }: ProtectedRouteProps) => {
   const user = "ADMIN";
   const currentLocation = useLocation();
   useEffect(() => {
      if (!isAuthenticated) {
         setRedirectPath(currentLocation.pathname);
      }
   }, [isAuthenticated, setRedirectPath, currentLocation]);

   if (isAuthenticated && redirectPath === currentLocation.pathname) {
      return <Route {...routeProps} />;
   } else {
      return <Navigate to={{ pathname: isAuthenticated ? redirectPath : authenticationPath }} />;
   }
};

export default ProtectedRoute;
