import React, { FormEvent } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { uploadFileCustomer } from "../../../actions/customerAction";
import Button from "../../UI/Button";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import classes from "./uploadModal.module.css";
const UploadModal: React.FC<{
   onClose: () => void;
}> = (props) => {
   const [fileSelected, setFileSelected] = React.useState<File>();
   const dispatch = useDispatch();
   const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      console.log(fileList);

      if (!fileList) return;

      setFileSelected(fileList[0]);
   };
   // const uploadFileHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
   const uploadFileHandler = (e: FormEvent) => {
      e.preventDefault();
      if (fileSelected) {
         const formData = new FormData();
         formData.append("file", fileSelected, fileSelected.name);
         dispatch(uploadFileCustomer(formData));
         props.onClose();
      }
   };
   return (
      <Modal className={classes.uploadModal} onClose={props.onClose}>
         <form onSubmit={uploadFileHandler}>
            <div className={classes.button}>
               {/* <Input type="file" /> */}
               <AiOutlineCloudUpload />
               <input type="file" onChange={fileChangeHandler} />
            </div>
            <Button type="submit">Upload</Button>
         </form>
      </Modal>
   );
};

export default UploadModal;
