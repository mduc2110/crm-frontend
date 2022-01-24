import React from "react";
import classes from "./button.module.css";
const Button: React.FC<{
   onClick?: () => void;
   type?: "button" | "submit";
   style?: {}
}> = (props) => {
   const { type } = props;
   return (
      <button className={classes.mainButton} onClick={props.onClick} type={type} style={props.style}>
         {props.children}
      </button>
   );
};

export default Button;
