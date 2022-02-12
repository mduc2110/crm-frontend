import { ReactNode } from "react";
import React from "react";
import classes from "./table.module.css";

const Table: React.FC<{
   children?: ReactNode;
   showPagination?: boolean;
}> = (props) => {
   return (
      <>
         <div className={classes.tableWrap}>
            <table className={classes.table}>{props.children}</table>
         </div>
         {props.showPagination === false && (
            <div className={classes.pagination}>
               Hiển thị{" "}
               <select name="" id="">
                  <option value="5">5</option>
                  <option value="10">10</option>
                  <option value="15">15</option>
               </select>{" "}
               kết quả
            </div>
         )}
      </>
   );
};

export default Table;
