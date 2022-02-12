import React, { useEffect, useState } from "react";
import { AiOutlineEllipsis, AiOutlinePlusCircle, AiOutlineUpload } from "react-icons/ai";
import { useDispatch } from "react-redux";
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

const CustomerPage = () => {
   const [modalIsShown, setModalIsShown] = useState<boolean>(false);
   const [uploadModalIsShown, setUploadModalIsShown] = useState<boolean>(false);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setPageTitle("Khách hàng"));
   }, []);
   const hideModalHandler = () => {
      setModalIsShown(false);
   };

   const addCustomerHandler = () => {
      setModalIsShown(true);
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
                              <button>Gửi email</button>
                           </li>
                           <li>
                              <button>Gửi SMS</button>
                           </li>
                           <li>
                              <button>Tạo công việc</button>
                           </li>
                           <li>
                              <button>Khác</button>
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

            <CustomerList />
         </Panel>
      </div>
   );
};

export default CustomerPage;
