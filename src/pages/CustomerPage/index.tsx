import { useState } from "react";
import {
   AiOutlineEllipsis,
   AiOutlinePlusCircle,
   AiOutlineSearch,
   AiOutlineUpload,
} from "react-icons/ai";
import CustomerList from "../../components/CustomerList";
import Button from "../../components/UI/Button";
import IconButton from "../../components/UI/IconButton";
import Input from "../../components/UI/Input";
import Panel from "../../components/UI/Panel";
import SearchBar from "../../components/UI/SearchBar";
import Table from "../../components/UI/Table";

import classes from "./customerPage.module.css";

const CustomerPage = () => {
   const [searchText, setSearchText] = useState<string>("");
   const searchCustomerHandler = () => {};
   return (
      <div className={classes.customerPage}>
         <Panel>
            <div className={classes.header}>
               <SearchBar />
               <div className={classes.actions}>
                  <Button>
                     <AiOutlineUpload /> Tải lên
                  </Button>
                  <Button>
                     <AiOutlinePlusCircle /> Thêm khách hàng
                  </Button>
                  <div className={classes.actionDropdown}>
                     <IconButton iconComponent={<AiOutlineEllipsis />} />
                     <div className={classes.dropbox}>
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
