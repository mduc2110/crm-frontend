import React from "react";
import { Oval } from "react-loader-spinner";
import classes from "./button.module.css";
const Button: React.FC<{
   onClick?: () => void;
   type?: "button" | "submit";
   style?: {};
   disabled?: boolean;
}> = (props) => {
   const { type } = props;
   return (
      <button
         disabled={props.disabled}
         className={`${classes.mainButton} ${props.disabled ? classes.stop : ""}`}
         onClick={props.onClick}
         type={type}
         style={props.style}
      >
         <Oval color="#fff" height={25} width={25}></Oval>
         {props.children}
      </button>
   );
};

export default Button;
