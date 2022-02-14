import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import roleApi from "../../api/roleApi";
import Button from "../../components/UI/Button";
import Panel from "../../components/UI/Panel";
import Select from "../../components/UI/Select";
import { SelectType } from "../../types";
import classes from "./rolePage.module.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../actions/uiAction";

interface Permission {
   id: string;
   description: string;
   permissionName: string;
   isChecked: boolean;
}

const RolePage = () => {
   const [permissionList, setPermissionList] = useState<Permission[]>([]);
   const [roleList, setRoleList] = useState<SelectType[]>([]);
   const [selectedRole, setSelectedRole] = useState("");
   const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(setPageTitle("Phân quyền"));
   }, [dispatch]);
   useEffect(() => {
      let isMounted = true;
      const fetchRole = async () => {
         //fetch role
         const roleResponse = await roleApi.getAll();
         const roles: any[] = roleResponse.data;

         //fetch permissions
         const permissionResponse = await roleApi.getAllPermission();
         const permissions: Permission[] = permissionResponse.data;

         if (isMounted) {
            setRoleList(
               roles.map((role) => {
                  return {
                     id: role.id,
                     name: role.roleName + " - " + role.description,
                  };
               })
            );
            // setSelectedRole(roles[0].id);

            setPermissionList(
               permissions.map((permission) => {
                  return {
                     id: permission.id,
                     description: permission.description,
                     permissionName: permission.permissionName,
                     isChecked: false,
                  };
               })
            );
            setIsFetchingData(false);
         }
      };

      fetchRole();
      return () => {
         isMounted = false;
      };
   }, []);
   useEffect(() => {
      setIsFetchingData(true);
      const fetchOneRole = async () => {
         const response = await roleApi.getOne(selectedRole);
         // setPermissionList(response.data);
         const { permissions } = response.data;
         let permissionIdList: number[] = [];
         if (Array.isArray(permissions) && permissions.length > 0) {
            permissionIdList = permissions.map((per) => per.id);
         }

         const clonePermissionList = [...permissionList].map((item) => {
            return {
               ...item,
               isChecked: false,
            };
         });
         permissionIdList.forEach((id) => {
            const index = clonePermissionList.findIndex((item) => +item.id === id);
            if (index !== -1) {
               clonePermissionList[index] = {
                  ...clonePermissionList[index],
                  isChecked: true,
               };
            }
         });
         setPermissionList(clonePermissionList);
         setIsFetchingData(false);
      };
      fetchOneRole();
   }, [selectedRole]);
   // const changeRoleHandler = () => {};
   const checkedHandler = (e: ChangeEvent<HTMLInputElement>) => {
      if (!selectedRole) {
         toast.warn("Vui lòng chọn một quyền");
      } else {
         const cloneObject = Object.assign(permissionList, {});
         const index = cloneObject.findIndex((item) => +item.id === +e.target.value);
         cloneObject[index] = {
            ...cloneObject[index],
            isChecked: e.target.checked,
         };
         setPermissionList([...cloneObject]);
      }
      // console.log(cloneObject.findIndex((item) => +item.id === +e.target.value));
   };

   const submitHandler = async (e: FormEvent) => {
      e.preventDefault();
      try {
         const checkedList = permissionList.filter((item) => item.isChecked);
         const permissionIdList = checkedList.map((item) => item.id);
         await roleApi.updatePermisionForRole(selectedRole, permissionIdList);
         toast.success("Cập nhật thành công");
      } catch (error: any) {
         console.log(error.message);
         toast.success("Cập nhật thất bại");
      }
   };
   return (
      <Panel className={classes.rolePage}>
         <Select
            className={classes.select}
            options={roleList}
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
         />
         <div className={classes.permissionTable}>
            <form onSubmit={submitHandler}>
               <table className={classes.table}>
                  <tbody>
                     {isFetchingData ? (
                        <tr>
                           <td>
                              <Skeleton
                                 count={10}
                                 height="25px"
                                 width="20px"
                                 style={{ marginTop: "10px" }}
                              />
                           </td>
                           <td>
                              <Skeleton
                                 count={10}
                                 height="25px"
                                 width="80px"
                                 style={{ marginTop: "10px" }}
                              />
                           </td>
                           <td>
                              <Skeleton
                                 count={10}
                                 height="25px"
                                 width="200px"
                                 style={{ marginTop: "10px" }}
                              />
                           </td>
                        </tr>
                     ) : (
                        permissionList?.map((permission, index) => {
                           return (
                              <tr key={index}>
                                 <td>
                                    <input
                                       type="checkbox"
                                       checked={permission.isChecked}
                                       onChange={checkedHandler}
                                       value={permission.id}
                                    />
                                 </td>
                                 <td>{permission.permissionName}</td>
                                 <td>{permission.description}</td>
                              </tr>
                           );
                        })
                     )}
                  </tbody>
               </table>
               <Button>Cập nhật</Button>
            </form>
         </div>
      </Panel>
   );
};

export default RolePage;
