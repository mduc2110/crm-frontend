import React from "react";
import { useAppSelector } from "../../store";
import { UserState } from "../../store/types";
import Table from "../UI/Table";

const UserList: React.FC = (props) => {
   const userList = useAppSelector((state) => state.user);
   return (
      <Table>
         <thead>
            <tr>
               <th>
                  <input type="checkbox" />
               </th>
               <th>STT</th>
               <th>Tên đăng nhập</th>
               <th>Họ và tên</th>
               <th>Email</th>
               <th>Chức vụ</th>
               <th>Phòng ban</th>
            </tr>
         </thead>
         <tbody>
            {userList?.map((user, index) => {
               return (
                  <tr key={index}>
                     <td>
                        <input type="checkbox" data-id={user.id} />
                     </td>
                     <td>{index + 1}</td>
                     <td>{user.username}</td>
                     <td>{user.name}</td>
                     <td>{user.email}</td>
                     <td>{user.role.description}</td>
                     <td>{user.dept.departmentName}</td>
                  </tr>
               );
            })}
         </tbody>
      </Table>
   );
};

export default UserList;
