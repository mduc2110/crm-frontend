import JoditEditor from "jodit-react";
import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { Oval } from "react-loader-spinner";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { setPageTitle } from "../../actions/uiAction";
import customerApi from "../../api/customerApi";
import serviceApi from "../../api/servicesApi";
import Button from "../../components/UI/Button";
import Input from "../../components/UI/Input";
import Panel from "../../components/UI/Panel";
import useDebounce from "../../hooks/useDebounce";
import { CustomerState } from "../../store/types";
import classes from "./campaignPage.module.css";

export interface EmailInterface {
   email: string[];
   subject: string;
   html: string;
}

const CampaignPage = () => {
   const editor = useRef(null);
   const [emailValue, setEmailValue] = useState<EmailInterface>({
      email: [],
      subject: "",
      html: "",
   });
   // const [textContent, setTextContent] = useState<string>("");
   const [searchCustomer, setSeachCustomer] = useState<string>("");
   const [isCustomerFocused, setIsCustomerFocused] = useState<boolean>(false);
   const [customersList, setCustomerListSelect] = useState<CustomerState[]>([]);
   const [isCustomerFetching, setIsCustomerFetching] = useState<boolean>(false);

   const dispatch = useDispatch();

   const richTextHandler = (content: string) => {
      // setTextContent(content);

      setEmailValue((prev) => {
         return { ...prev, html: content };
      });
   };
   useEffect(() => {
      dispatch(setPageTitle("Gửi mail"));
   }, [dispatch]);
   useDebounce(
      () => {
         const fetchUserByName = async () => {
            if (searchCustomer.length !== 0) {
               const response = await customerApi.getAll("?q=" + searchCustomer);
               setCustomerListSelect(response.data.results);
               setIsCustomerFetching(false);
            }
         };
         fetchUserByName();
      },
      500,
      [searchCustomer]
   );
   const addCustomerEmailHandler = (email: string) => {
      const emailListClone = [...emailValue.email];
      if (!emailListClone.includes(email)) {
         emailListClone.push(email);
      }

      setEmailValue((prev) => {
         return { ...prev, email: emailListClone };
      });

      setSeachCustomer("");
      setIsCustomerFocused(false);
   };
   const seachCustomerhandler = (e: ChangeEvent<HTMLInputElement>) => {
      setSeachCustomer(e.target.value);
      setIsCustomerFetching(true);
   };
   const removeCustomerEmailHandler = (email: string) => {
      // const emailListClone = [...emailValue.email].filter(item => item !== email);
      setEmailValue((prev) => {
         return { ...prev, email: prev.email.filter((item) => item !== email) };
      });
   };
   const sendEmailHandler = async (e: FormEvent) => {
      e.preventDefault();
      try {
         await serviceApi.sendEmail(emailValue);
         setEmailValue({
            email: [],
            subject: "",
            html: "",
         });
         toast.success("Gửi Email thành công");
      } catch (error) {
         toast.error("Gửi Email thất bại");
      }
      console.log(emailValue);
   };
   return (
      <Panel className={classes.campaignPage}>
         <form onSubmit={sendEmailHandler}>
            <div className={classes.searchBox}>
               <span className={classes.title}>Tìm kiếm Email</span>
               <Input
                  className={classes.searchInput}
                  value={searchCustomer}
                  onChange={seachCustomerhandler}
                  onFocus={() => setIsCustomerFocused(true)}
                  onBlur={() => setIsCustomerFocused(false)}
               />
               <div
                  className="actionDropdown"
                  // className={`actionDropdown ${
                  //    isCustomerFocused ? "active" : ""
                  // }`}
               >
                  <div
                     className={`searchResult dropbox ${
                        isCustomerFocused || isCustomerFetching ? "active" : ""
                     } ${classes.dropbox}`}
                  >
                     {isCustomerFetching && (
                        <div className={classes.spinnerWrapper}>
                           <Oval color="#3e4a92" height={25} width={25}></Oval>
                        </div>
                     )}

                     <ul>
                        {customersList?.map((item, index) => (
                           <li key={index}>
                              <span onClick={() => addCustomerEmailHandler(item.email)}>
                                 {/* {item.email} */}
                                 {`${item.email} - ${item.customerName}`}
                              </span>
                           </li>
                        ))}

                        {searchCustomer.length !== 0 &&
                           !isCustomerFetching &&
                           customersList.length === 0 && (
                              <li>
                                 <span onClick={() => addCustomerEmailHandler(searchCustomer)}>
                                    {searchCustomer}
                                 </span>
                              </li>
                           )}
                     </ul>
                  </div>
               </div>
            </div>
            <ul className={classes.emailList}>
               <span className={classes.title}>Gửi tới: </span>
               {emailValue.email?.map((item, index) => (
                  <li key={index}>
                     {item}{" "}
                     <AiOutlineCloseCircle onClick={() => removeCustomerEmailHandler(item)} />
                  </li>
               ))}
            </ul>
            <span className={classes.title}>Tiêu đề</span>
            <input
               className={classes.inputSubject}
               value={emailValue.subject}
               onChange={(e) =>
                  setEmailValue((prev) => {
                     return {
                        ...prev,
                        subject: e.target.value,
                     };
                  })
               }
            />
            <div className={classes.richTextArea}>
               {/* <span className={classes.title}>Nội dung công việc</span> */}
               <div className={classes.textEditor}>
                  <JoditEditor
                     ref={editor}
                     value={emailValue.html}
                     onBlur={(content) => richTextHandler(content)}
                  />
               </div>
            </div>
            <Button>Gửi</Button>
         </form>
      </Panel>
   );
};

export default CampaignPage;
