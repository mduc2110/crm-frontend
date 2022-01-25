import { useState } from "react";
import classes from "./searchBar.module.css";
import IconButton from "../IconButton";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../Input";
const SearchBar: React.FC<{
   className?: string;
}> = (props) => {
   const [searchText, setSearchText] = useState<string>("");
   const searchCustomerHandler = () => {};
   return (
      <form onSubmit={searchCustomerHandler} className={`${classes.searchBar} ${props.className}`}>
         <Input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
         <button type="submit">
            <AiOutlineSearch />
         </button>
         {/* <IconButton iconComponent={<AiOutlineSearch />} color="#fff" background="red" /> */}
      </form>
   );
};

export default SearchBar;
