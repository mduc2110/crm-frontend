import React, { ChangeEvent, useEffect, useState } from "react";
import { AiOutlineEllipsis, AiOutlinePlusCircle, AiOutlineUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
import Swal from "sweetalert2";
import { deleteCustomer } from "../../actions/customerAction";
import { setPageTitle } from "../../actions/uiAction";
import CustomerList from "../../components/CustomerList";
import CustomerModal from "../../components/Modals/CustomerModal";
import UploadModal from "../../components/Modals/UploadModal";
import Button from "../../components/UI/Button";
import IconButton from "../../components/UI/IconButton";
import Panel from "../../components/UI/Panel";
import SearchBar from "../../components/UI/SearchBar";
import classes from "./customerPage.module.css";
// import "../../styles/commonStyle/common.css";

interface CustomerSelect {
   id: string;
   email: string;
}

const CustomerPage = () => {
   const [modalIsShown, setModalIsShown] = useState<boolean>(false);
   const [uploadModalIsShown, setUploadModalIsShown] = useState<boolean>(false);
   const [customerSelect, setCustomerSelect] = useState<CustomerSelect[]>([]);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setPageTitle("Khách hàng"));
   }, [dispatch]);
   const hideModalHandler = () => {
      setModalIsShown(false);
   };

   const addCustomerHandler = () => {
      setModalIsShown(true);
   };

   const deleteCustomersHandler = () => {
      const selectedIdList = customerSelect.map((element) => element.id);

      Swal.fire({
         title: `Xóa ${selectedIdList.length} khách hàng`,
         text: "Bạn sẽ không thể hoàn tác",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3e4a92",
         cancelButtonColor: "#d33",
         confirmButtonText: "Xóa",
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(deleteCustomer(selectedIdList));
            refreshCustomerSelectListHandler();
            Swal.fire("Deleted!", "Xóa thành công.", "success");
         }
      });
   };
   const changeCustomerSelectHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const { checked } = e.target;
      const idValue = e.target.value;
      const { email } = e.target.dataset;
      const cloneIdList = [...customerSelect];
      if (checked) {
         cloneIdList.push({
            id: idValue,
            email: email as string,
         });
      } else {
         const index = cloneIdList.findIndex((element) => element.id === idValue);
         cloneIdList.splice(index, 1);
      }
      // e.target.checked = false;
      setCustomerSelect(cloneIdList);
   };

   const refreshCustomerSelectListHandler = () => {
      setCustomerSelect([]);
   };

   return (
      <div className={classes.customerPage}>
         {modalIsShown && <CustomerModal title="Thêm khách hàng" onClose={hideModalHandler} />}
         {uploadModalIsShown && <UploadModal onClose={() => setUploadModalIsShown(false)} />}

         <Panel>
            <div className={classes.header}>
               <SearchBar />
               <div className={classes.actions}>
                  <Button onClick={() => setUploadModalIsShown(true)}>
                     <AiOutlineUpload /> Tải lên
                  </Button>
                  <Button onClick={addCustomerHandler}>
                     <AiOutlinePlusCircle /> Thêm khách hàng
                  </Button>
                  <div className="actionDropdown">
                     <IconButton iconComponent={<AiOutlineEllipsis />} />
                     <div className="dropbox">
                        <ul>
                           <li>
                              <span>Gửi email</span>
                           </li>
                           <li>
                              <span>Gửi SMS</span>
                           </li>
                           <li>
                              <span>Tạo công việc</span>
                           </li>
                           <li onClick={deleteCustomersHandler}>
                              <span>Xóa</span>
                           </li>
                           <li>
                              <span>Khác</span>
                           </li>
                        </ul>
                     </div>
                  </div>
               </div>
            </div>
            {/* <form onSubmit={searchCustomerHandler} className={classes.searchForm}>
               <Input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
               <IconButton iconComponent={<AiOutlineSearch />} color="#fff" background="red" />
            </form> */}

            <CustomerList
               onSetIdCustomerList={changeCustomerSelectHandler}
               refreshCustomerCheckList={refreshCustomerSelectListHandler}
            />
         </Panel>
      </div>
   );
};

export default CustomerPage;
