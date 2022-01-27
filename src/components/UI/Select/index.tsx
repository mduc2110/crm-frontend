import React from "react";
import { Tag } from "../../../types";
import classes from "./select.module.css";
const Select: React.FC<{
   options: any[];
   labelName?: string;
   onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
   value: string;
   inputId?: string;
}> = (props) => {
   console.log(props.options);

   return (
      <div>
         {props.labelName ?? <label htmlFor={props.inputId}></label>}
         <select className={classes.select} onChange={(e) => props.onChange(e)} value={props.value}>
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
