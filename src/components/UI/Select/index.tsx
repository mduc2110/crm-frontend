import React from "react";
import { Tag } from "../../../types";
import classes from "./select.module.css";
const Select: React.FC<{
   options: any[];
   labelName?: string;
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
   value: string;
   inputId?: string;
   className?: string;
}> = (props) => {
   return (
      <div className={`${classes.select} ${props.className}`}>
         <span className={classes.label}>{props.labelName}</span>
         <select onChange={(e) => props.onChange(e)} value={props.value}>
            <option value="">Chọn</option>
            {props.options?.map((option, index) => (
               <option key={index} value={option.id}>
                  {option.name}
               </option>
            ))}
         </select>
      </div>
   );
};

export default Select;
