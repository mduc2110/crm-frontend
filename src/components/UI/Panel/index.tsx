import { ReactNode } from "react";
import classes from "./panel.module.css";

const Panel: React.FC<{
   children: ReactNode;
   className?: string;
}> = (props) => {
   return (
      <div className={`${classes.panel} ${props.className ? props.className : ""}`}>
         {props.children}
      </div>
   );
};

export default Panel;
