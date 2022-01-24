import { ReactNode } from "react";
import classes from "./panel.module.css";

const Panel : React.FC<{
    children : ReactNode
}> = (props) => {
  return <div className={classes.panel}>
      {props.children}
  </div>;
};

export default Panel;
