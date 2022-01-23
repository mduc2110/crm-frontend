import React, { useEffect, useState } from "react";
import classes from "./loginPage.module.css";
import LoginImage from "./LoginImage";
import Input from "../../components/UI/Input";
import Button from "../../components/UI/Button";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { auth } from "../../actions/auth";
import { useNavigate } from "react-router-dom";
import { AuthState } from "../../store/types";
import { useAppDispatch, useAppSelector } from "../../store";
const LoginPage = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();
   // const dispatch = useAppDispatch();
   const navigate = useNavigate();

   const authState: AuthState = useAppSelector((state) => state.auth);

   const loginHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      // const response = await userApi.login({ username, password });
      // console.log(response);
      try {
         dispatch(auth({ username, password }));
         navigate("/");
      } catch (error) {
         console.log(error);
      }
   };

   useEffect(() => {
      if (authState.isAuthenticated) {
         navigate("/dashboard");
      }
   }, [authState.isAuthenticated, navigate]);

   return (
      <div className={classes.loginPage}>
         <div className={classes.inner}>
            <LoginImage />
            <form onSubmit={loginHandler} className={classes.loginForm}>
               <h1>WELCOME BACK</h1>
               <Input
                  value={username}
                  placeholder="Username"
                  onChange={(e) => setUsername(e.target.value)}
               />
               <Input
                  value={password}
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
               />
               <Button type="submit">Đăng nhập</Button>
            </form>
         </div>
      </div>
   );
};

export default LoginPage;
