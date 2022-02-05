import React, { ReactNode } from "react";
import classes from "./iconButton.module.css";
const IconButton: React.FC<{
   iconComponent: ReactNode;
   color?: string | undefined;
   type?: "button" | "submit";
   background?: string | undefined;
   onClick?: () => void;
}> = (props) => {
   return (
      <button
         className={classes.icoButton}
         style={{ color: props.color, background: props.background }}
         type={props.type}
         onClick={props.onClick}
      >
         {props.iconComponent}
      </button>
   );
};

export default IconButton;
