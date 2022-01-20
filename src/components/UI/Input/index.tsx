import React from "react";
import classes from "./input.module.css";
const Input: React.FC<{
   labelName?: string;
   inputId?: string;
   type?: string;
   placeholder?: string;
   value: any;
   onChange: (e: any) => void;
}> = (props) => {
   return (
      <div className={classes.input__control}>
         {props.labelName ?? <label htmlFor={props.inputId}></label>}
         <input type={props.type ? props.type : "text"} placeholder={props.placeholder || ""} value={props.value} onChange={props.onChange} />
      </div>
   );
};

export default Input;
