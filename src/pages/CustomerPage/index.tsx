import { useState } from "react";
import {
   AiOutlineEllipsis,
   AiOutlinePlusCircle,
   AiOutlineSearch,
   AiOutlineUpload,
} from "react-icons/ai";
import CustomerList from "../../components/CustomerList";
import CustomerModal from "../../components/Modals/CustomerModal";
import Button from "../../components/UI/Button";
import IconButton from "../../components/UI/IconButton";
import Input from "../../components/UI/Input";
import Panel from "../../components/UI/Panel";
import SearchBar from "../../components/UI/SearchBar";
import Table from "../../components/UI/Table";
import classes from "./customerPage.module.css";
// import "../../styles/commonStyle/common.css";

const CustomerPage = () => {
   const [searchText, setSearchText] = useState<string>("");
   const searchCustomerHandler = () => {};
   const [modalIsShown, setModalIsShown] = useState<boolean>(false);
   const showCartHandler = () => {};

   const hideModalHandler = () => {
      setModalIsShown(false);
   };

   const addCustomerHandler = () => {
      setModalIsShown(true);
   };

   return (
      <div className={classes.customerPage}>
         {modalIsShown && <CustomerModal title="Thêm khách hàng" onClose={hideModalHandler} />}

         <Panel>
            <div className={classes.header}>
               <SearchBar />
               <div className={classes.actions}>
                  <Button>
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
