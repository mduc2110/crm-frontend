import React, { useEffect, useState } from "react";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Skeleton from "react-loading-skeleton";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { deleteUser, getAllUser } from "../../actions/userAction";
import { useAppSelector } from "../../store";
import IconButton from "../UI/IconButton";
import Table from "../UI/Table";

const UserList: React.FC = (props) => {
   const userList = useAppSelector((state) => state.user);
   const [isFetchingData, setIsFetchingData] = useState<boolean>(true);
   const dispatch = useDispatch();
   const location = useLocation();
   useEffect(() => {
      setIsFetchingData(true);
      dispatch(getAllUser(location.search));
      setIsFetchingData(false);
   }, [dispatch, location.search]);
   const editUserHandler = (id: string) => {};
   const deleteUserHandler = (id: string) => {
      Swal.fire({
         // title: "Are you sure?",
         text: "Bạn sẽ không thể hoàn tác",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3e4a92",
         cancelButtonColor: "#d33",
         confirmButtonText: "Xóa",
      }).then((result) => {
         if (result.isConfirmed) {
            dispatch(deleteUser(id));
            Swal.fire("Deleted!", "Xóa thành công.", "success");
         }
      });
   };
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
               <th>Hành động</th>
            </tr>
         </thead>
         <tbody>
            {isFetchingData ? (
               <tr>
                  <td>
                     <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                  </td>
                  <td>
                     <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                  </td>
                  <td>
                     <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                  </td>
                  <td>
                     <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                  </td>
                  <td>
                     <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                  </td>
                  <td>
                     <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                  </td>
                  <td>
                     <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                  </td>
                  <td>
                     <Skeleton count={8} height="25px" style={{ marginTop: "10px" }} />
                  </td>
               </tr>
            ) : (
               ""
            )}
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
                     <td>
                        <IconButton
                           onClick={() => editUserHandler(user.id)}
                           iconComponent={<AiOutlineEdit />}
                        />
                        <IconButton
                           onClick={() => deleteUserHandler(user.id)}
                           iconComponent={<AiOutlineDelete />}
                           color="red"
                        />
                     </td>
                  </tr>
               );
            })}
         </tbody>
      </Table>
   );
};

export default UserList;
