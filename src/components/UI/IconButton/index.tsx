import React, { ReactNode } from "react";
import classes from "./iconButton.module.css";
const IconButton: React.FC<{
   iconComponent: ReactNode;
   color?: string | undefined;
   type?: "button" | "submit";
   background?: string | undefined;
}> = (props) => {
   return (
      <button
         className={classes.button}
         style={{ color: props.color, background: props.background }}
         type={props.type}
      >
         {props.iconComponent}
      </button>
   );
};

export default IconButton;
