import React, { useState } from "react";
import classes from "./loginPage.module.css";
import LoginImage from "./LoginImage";
import Input from "../../UI/Input";
import Button from "../../UI/Button";
import userApi from "../../api/userApi";
import { useDispatch } from "react-redux";
import { auth } from "../../actions/auth";
const LoginPage = () => {
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const dispatch = useDispatch();

   const loginHandler = async (e: React.FormEvent) => {
      e.preventDefault();
      console.log(username);
      console.log(password);
      // const response = await userApi.login({ username, password });
      // console.log(response);
      try {
         dispatch(auth({ username, password }));
      } catch (error) {
         console.log(error);
      }
   };
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
