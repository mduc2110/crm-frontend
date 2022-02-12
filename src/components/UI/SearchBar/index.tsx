import { FormEvent, useState } from "react";
import React from "react";
import classes from "./searchBar.module.css";
import queryString from "query-string";
import { AiOutlineSearch } from "react-icons/ai";
import Input from "../Input";
import Button from "../Button";
import { useLocation, useNavigate } from "react-router-dom";
const SearchBar: React.FC<{
   className?: string;
}> = (props) => {
   const [searchText, setSearchText] = useState<string>("");
   const nagivate = useNavigate();
   const location = useLocation();
   const searchCustomerHandler = (e: FormEvent) => {
      e.preventDefault();
      if (searchText) {
         const q = queryString.parse(location.search);
         q.q = searchText;
         setSearchText("");
         nagivate("?" + queryString.stringify(q));
      } else {
         nagivate("");
      }
   };
   return (
      <form
         onSubmit={searchCustomerHandler}
         className={`${classes.searchBar} ${props.className ? props.className : ""}`}
      >
         <Input onChange={(e) => setSearchText(e.target.value)} value={searchText} />
         <Button type="submit">
            <AiOutlineSearch />
         </Button>
         {/* <IconButton iconComponent={<AiOutlineSearch />} color="#fff" background="red" /> */}
      </form>
   );
};

export default SearchBar;
