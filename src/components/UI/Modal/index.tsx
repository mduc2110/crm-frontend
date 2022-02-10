import React, { Fragment, ReactNode } from "react";
import classes from "./modal.module.css";
import ReactDOM from "react-dom";
import Panel from "../Panel";

const Backdrop: React.FC<{
   children?: ReactNode;
   onClose: () => void;
}> = (props) => {
   return <div className={classes.backdrop} onClick={props.onClose} />;
};

const ModalOverlay: React.FC<{
   children?: ReactNode;
   isLoading?: boolean;
   className?: string;
}> = (props) => {
   return (
      <div className={`${classes.modal} ${props.className}`}>
         <div className={classes.content}>{props.children}</div>
         {props.isLoading && <div className={classes.loading}></div>}
      </div>
   );
};

const portalElement = document.getElementById("overlays");

const Modal: React.FC<{
   children?: ReactNode;
   isLoading?: boolean;
   onClose: () => void;
   className?: string;
}> = (props) => {
   return (
      <Fragment>
         {portalElement &&
            ReactDOM.createPortal(<Backdrop onClose={props.onClose} />, portalElement)}
         {portalElement &&
            ReactDOM.createPortal(
               <ModalOverlay className={props.className} isLoading={props.isLoading}>
                  {props.children}
               </ModalOverlay>,
               portalElement
            )}
      </Fragment>
   );
};

export default Modal;
