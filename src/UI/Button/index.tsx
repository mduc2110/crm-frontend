import React from "react";
import classes from "./button.module.css";
const Button: React.FC<{
   onClick?: () => void;
   type?: "button" | "submit";
}> = (props) => {
   const { type } = props;
   return (
      <button className={classes.mainButton} onClick={props.onClick} type={type}>
         {props.children}
      </button>
   );
};

export default Button;
