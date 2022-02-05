import { ReactNode } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Button from "../Button";
import classes from "./table.module.css";

const Table: React.FC<{
   children?: ReactNode;
}> = (props) => {
   return (
      <>
         <div className={classes.tableWrap}>
            <table className={classes.table}>{props.children}</table>
         </div>
         <div className={classes.pagination}>
            Hiển thị{" "}
            <select name="" id="">
               <option value="5">5</option>
               <option value="10">10</option>
               <option value="15">15</option>
            </select>{" "}
            kết quả
         </div>
      </>
   );
};

export default Table;
