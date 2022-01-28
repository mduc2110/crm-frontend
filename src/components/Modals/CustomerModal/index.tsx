import React, { FormEvent, useEffect, useState } from "react";
import { Tag } from "../../../types";
import Input from "../../UI/Input";
import Modal from "../../UI/Modal";
import Select from "../../UI/Select";

import provinceData from "../../../assets/address/province.json";
import districtData from "../../../assets/address/district.json";
import wardData from "../../../assets/address/ward.json";
interface Customer {
   customerName: string;
   phone: string;
   email: string;
   birthday: string;
   gender: string;
   personalID: string;
}

// interface Tag {
//    id: number;
//    tagName: string;
// }
interface SelectType {
   id: string;
   name: string;
}

const CustomerModal: React.FC<{
   onClose: () => void;
   title: string;
}> = (props) => {
   const [customerField, setCustomerField] = useState({
      customerName: "",
      phone: "",
      email: "",
      birthday: "",
      gender: "",
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
   const [districtList, setdDistrictList] = useState<SelectType[]>([]);
   const [ward, setWard] = useState([]);

   const changeInputHandler = (e: React.FormEvent<HTMLInputElement>) => {
      console.log(e.currentTarget.value);

      // HTMLInputElement
      // e.preventDefault();
      setCustomerField((prev) => {
         return {
            ...prev,
            detailAddress: e.currentTarget.value,
         };
      });
   };
   // const [id, setId] = useState({
   //    id1: "",
   //    id2: "",
   // });
   const [id, setId] = useState("");
   const changeTagHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
      // console.log(event.target.value);
      // console.log(typeof event.currentTarget.value);
      setId(event.currentTarget.value);
      // setId((prev) => {
      //    return {
      //       ...prev,
      //       id2: event.currentTarget.value,
      //    };
      // });
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

      const data: SelectType[] = provinceData.province[0].map((province) => {
         return { id: province.code, name: province.name };
      });
      setProvinceList(data);
      const e1 = data[0].id;
      const specDistrictId = customerField.idProvince || "thanh-pho-ha-noi";
      const dist: SelectType[] = districtData.district["thanh-pho-ha-noi"].map((district) => {
         return { id: district.code, name: district.name };
      });
      setdDistrictList(dist);
   }, []);
   console.log(provinceList);

   return (
      <Modal onClose={props.onClose}>
         <h2>{props.title}</h2>
         <div className="inner">
            <Input
               value={customerField.customerName}
               labelName={"Tên khách hàng"}
               onChange={(e) =>
                  setCustomerField((prev) => {
                     return { ...prev, customerName: e.target.value };
                  })
               }
            />
            <Input
               value={customerField.phone}
               labelName={"Số điện thoại"}
               onChange={(e) =>
                  setCustomerField((prev) => {
                     return { ...prev, phone: e.target.value };
                  })
               }
            />
            <Input
               value={customerField.email}
               labelName={"Email"}
               onChange={(e) =>
                  setCustomerField((prev) => {
                     return { ...prev, email: e.target.value };
                  })
               }
            />
            <Input value={customerField.email} labelName={"Địa chỉ chi tiết"} onChange={changeInputHandler} />
            {/* <Input
               value={customerField.customerName}
               labelName={"Tên khách hàng"}
               onChange={(e) =>
                  setCustomerField((prev) => {
                     return { ...prev, customerName: e.target.value };
                  })
               }
            /> */}

            <Select
               options={tag}
               value={customerField.idTag}
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
               labelName={"Trạng thái khách hàng"}
               onChange={(e) =>
                  setCustomerField((prev) => {
                     return { ...prev, idStatus: e.target.value };
                  })
               }
            />
            <Select
               options={provinceList}
               value={customerField.idProvince}
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
               labelName={"Quận"}
               onChange={(e) =>
                  setCustomerField((prev) => {
                     return { ...prev, idDistrict: e.target.value };
                  })
               }
            />
         </div>
      </Modal>
   );
};

export default CustomerModal;
