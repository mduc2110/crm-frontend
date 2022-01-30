import React, { FormEvent, useEffect, useState } from "react";
import moment from "moment";
import { Tag } from "../../../types";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import Select from "../../UI/Select";
import Button from "../../UI/Button";

import provinceData from "../../../assets/address/province.json";
import districtData from "../../../assets/address/district.json";
import wardData from "../../../assets/address/ward.json";

import classes from "./customerModal.module.css";
import customerApi from "../../../api/customerApi";
import { useDispatch } from "react-redux";
import { addCustomer } from "../../../actions/customerAction";
import { CustomerState } from "../../../store/types";
interface Customer {
   customerName: string;
   phone: string;
   email: string;
   birthday: string;
   gender: string;
   personalID: string;
   idStatus: string;
   idTag: string;
   idProvince: string;
   idDistrict: string;
   idWard: string;
   detailAddress: string;
}

interface SelectType {
   id: string;
   name: string;
}

const CustomerModal: React.FC<{
   onClose: () => void;
   title: string;
}> = (props) => {
   const [customerField, setCustomerField] = useState<CustomerState>({
      id: "",
      customerName: "",
      phone: "",
      email: "",
      birthday: moment(new Date()).format("yyyy-MM-DD"),
      gender: "Nam",
      personalID: "",
      idStatus: "",
      idTag: "",
      idProvince: "",
      idDistrict: "",
      idWard: "",
      detailAddress: "",
   });
   const [tag, setTag] = useState<Tag[]>([]);

   const [provinceList, setProvinceList] = useState<SelectType[]>([]);
   const [districtList, setDistrictList] = useState<SelectType[]>([]);
   const [wardList, setWardList] = useState<SelectType[]>([]);
   const dispatch = useDispatch();

   const changeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setCustomerField((prev) => {
         return {
            ...prev,
            detailAddress: e.target.value,
         };
      });
   };

   useEffect(() => {
      const fetchTag = async () => {
         setTag([
            {
               id: 1,
               name: "KH Mới",
            },
            {
               id: 2,
               name: "KH Tiềm năng",
            },
         ]);
      };
      fetchTag();
   }, []);

   useEffect(() => {
      const province: SelectType[] = provinceData.province[0].map((province) => {
         return { id: province.code, name: province.name };
      });
      setProvinceList(province);

      const district: SelectType[] = customerField.idProvince
         ? (districtData.district as { [key: string]: any })[customerField.idProvince as any].map((district: any) => {
              return { id: district.code, name: district.name };
           })
         : [];
      setDistrictList(district);

      const ward: SelectType[] = customerField.idDistrict
         ? (wardData.ward as { [key: string]: any })[customerField.idDistrict as any].map((ward: any) => {
              return { id: ward.code, name: ward.name };
           })
         : [];
      setWardList(ward);
   }, [customerField.idProvince, customerField.idDistrict]);
   const onSubmitCustomerHandler = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log(customerField);
      dispatch(addCustomer(customerField));
   };
   return (
      <Modal onClose={props.onClose}>
         <h2>{props.title}</h2>
         <div className={classes["form-customer"]}>
            <form onSubmit={(e) => onSubmitCustomerHandler(e)}>
               <div className={classes.inputWrap}>
                  <div className={classes.informationArea}>
                     <Input
                        value={customerField.customerName}
                        className={classes.inputArea}
                        labelName={"Tên khách hàng"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, customerName: e.target.value };
                           })
                        }
                     />
                     <Input
                        value={customerField.phone}
                        className={classes.inputArea}
                        labelName={"Số điện thoại"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, phone: e.target.value };
                           })
                        }
                     />
                     <Input
                        value={customerField.email}
                        className={classes.inputArea}
                        labelName={"Email"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, email: e.target.value };
                           })
                        }
                     />

                     <Select
                        options={tag}
                        value={customerField.idTag}
                        className={classes.inputArea}
                        labelName={"Tag"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, idTag: e.target.value };
                           })
                        }
                     />
                     <Select
                        options={tag}
                        value={customerField.idStatus}
                        className={classes.inputArea}
                        labelName={"Trạng thái khách hàng"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, idStatus: e.target.value };
                           })
                        }
                     />

                     <Input
                        type="date"
                        value={customerField.birthday}
                        className={classes.inputArea}
                        labelName={"Ngày sinh"}
                        pattern="\d{4}-\d{2}-\d{2}"
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, birthday: e.target.value };
                           })
                        }
                     />
                     <Input
                        value={customerField.personalID}
                        className={classes.inputArea}
                        labelName={"CCCD/CMND"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, personalID: e.target.value };
                           })
                        }
                     />
                     <div className={classes.genderArea}>
                        <span>Giới tính</span>
                        <div className={classes.inner}>
                           <Input
                              labelName="Nam"
                              value={"Nam"}
                              type="radio"
                              name="gender"
                              checked={customerField.gender === "Nam"}
                              onChange={(e) =>
                                 setCustomerField((prev) => {
                                    return { ...prev, gender: e.target.value };
                                 })
                              }
                           />
                           <Input
                              labelName="Nữ"
                              value={"Nữ"}
                              type="radio"
                              name="gender"
                              checked={customerField.gender === "Nữ"}
                              onChange={(e) =>
                                 setCustomerField((prev) => {
                                    return { ...prev, gender: e.target.value };
                                 })
                              }
                           />
                           <Input
                              labelName="Khác"
                              value={"Khác"}
                              type="radio"
                              name="gender"
                              checked={customerField.gender === "Khác"}
                              onChange={(e) =>
                                 setCustomerField((prev) => {
                                    return { ...prev, gender: e.target.value };
                                 })
                              }
                           />
                        </div>
                     </div>
                  </div>
                  <div className={classes.addressArea}>
                     <Select
                        options={provinceList}
                        value={customerField.idProvince}
                        className={classes.inputArea}
                        labelName={"Thành phố"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, idProvince: e.target.value };
                           })
                        }
                     />
                     <Select
                        options={districtList}
                        value={customerField.idDistrict}
                        className={classes.inputArea}
                        labelName={"Quận"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, idDistrict: e.target.value };
                           })
                        }
                     />
                     <Select
                        options={wardList}
                        value={customerField.idWard}
                        className={classes.inputArea}
                        labelName={"Phường"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, idWard: e.target.value };
                           })
                        }
                     />
                     <Input
                        value={customerField.detailAddress}
                        className={classes.inputArea}
                        labelName={"Địa chỉ chi tiết"}
                        onChange={(e) =>
                           setCustomerField((prev) => {
                              return { ...prev, detailAddress: e.target.value };
                           })
                        }
                     />
                  </div>
               </div>
               <Button type="submit">Thêm</Button>
            </form>

            {/* <DatePicker 
               value={customerField.birthday}
            onChange={(e) =>
                  setCustomerField((prev) => {
                     return { ...prev, idWard: e };
                  })
               }/> */}
         </div>
      </Modal>
   );
};

export default CustomerModal;
