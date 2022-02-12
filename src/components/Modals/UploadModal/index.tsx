import axios from "axios";
import fileDownload from "js-file-download";
import React, { FormEvent, useState } from "react";
import { AiOutlineCloudUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { uploadFileCustomer } from "../../../actions/customerAction";
import Button from "../../UI/Button";
import Modal from "../../UI/Modal";
import classes from "./uploadModal.module.css";
// import FileDownload from "js-file"
const UploadModal: React.FC<{
   onClose: () => void;
}> = (props) => {
   const [fileSelected, setFileSelected] = React.useState<File>();
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const dispatch = useDispatch();
   const fileChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      console.log(fileList);

      if (!fileList) return;

      setFileSelected(fileList[0]);
   };
   const download = async (e: FormEvent) => {
      e.preventDefault();
      const response = await axios({
         url: process.env.REACT_APP_API_ENDPOINT + "/file-download",
         responseType: "blob",
         method: "GET",
      });
      fileDownload(response.data, "sample.xlsx");
   };
   // const uploadFileHandler = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
   const uploadFileHandler = async (e: FormEvent) => {
      e.preventDefault();
      if (fileSelected) {
         const formData = new FormData();
         formData.append("file", fileSelected, fileSelected.name);
         await setIsLoading(true);
         await dispatch(uploadFileCustomer(formData));
         await setIsLoading(false);
         await props.onClose();
      }
   };
   return (
      <Modal className={classes.uploadModal} onClose={props.onClose} isLoading={isLoading}>
         <h3>Tải tệp khách hàng</h3>
         <p className={classes.download}>
            Tải xuống tệp mẫu <span onClick={download}>Tại đây</span>
         </p>
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
