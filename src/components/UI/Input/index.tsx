import React from "react";
import classes from "./input.module.css";

const Input: React.FC<{
   labelName?: string;
   inputId?: string;
   type?: string;
   placeholder?: string;
   value: any;
   onChange: (e: any) => void;
   onFocus?: (e: any) => void;
   onBlur?: (e: any) => void;
   className?: string;
   name?: string;
   checked?: boolean;
   pattern?: string;
   min?: string;
}> = (props) => {
   return (
      <div className={`${classes.input__control} ${props.className ? props.className : ""}`}>
         {/* {props.labelName ?? <span className={classes.label}>{props.labelName}</span>} */}
         {props.type !== "radio" && <span className={classes.label}>{props.labelName}</span>}

         {/* <span>{props.labelName}</span> */}
         <input
            type={props.type ? props.type : "text"}
            placeholder={props.placeholder || ""}
            value={props.value}
            onChange={props.onChange}
            name={props.name}
            checked={props.checked}
            pattern={props.pattern}
            onFocus={props.onFocus}
            onBlur={props.onBlur}
            min={props.min}
         />
         {props.type === "radio" && <span className={classes.label}>{props.labelName}</span>}
      </div>
   );
};

export default Input;
