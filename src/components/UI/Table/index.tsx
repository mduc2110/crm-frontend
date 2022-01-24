import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import Button from "../Button";
import classes from "./table.module.css"

const Table = () => {
  return (
  <table className={classes.table}>
      <thead>
          <th><input type="checkbox" /></th>
          <th>STT</th>
          <th>Họ và tên</th>
          <th>Email</th>
          <th>Loại KH</th>
          <th>Trạng thái</th>
          <th  className={classes.actions}>Hành động</th>
      </thead>
      <tbody>
          <tr>
              <td><input type="checkbox" /></td>
              <td>1</td>
              <td>Vũ Mạnh Đức</td>
              <td>vmd211099@gmail.com</td>
              <td>Khách hàng mới</td>
              <td>Hoạt động</td>
              <td>
                  <div className={classes.actions}>
                      <a href="#"><AiOutlineEdit/></a>
                      <a href="#" style={{color: "red"}}><AiOutlineDelete/></a>
                      
                  </div>
              </td>
          </tr>
          <tr>
              <td><input type="checkbox" /></td>
              <td>2</td>
              <td>Tôn Nữ Thúy Ngân</td>
              <td>ngan01@gmail.com</td>
              <td>Khách hàng mới</td>
              <td>Hoạt động</td>
              <td>
<div className={classes.actions}>
                      <a href="#"><AiOutlineEdit/></a>
                      <a href="#" style={{color: "red"}}><AiOutlineDelete/></a>
                      
                  </div>
              </td>
          </tr>
          <tr>
              <td><input type="checkbox" /></td>
              <td>3</td>
              <td>Đồng Thị Bưởi</td>
              <td>duc11@gmail.com</td>
              <td>Khách hàng mới</td>
              <td>Hoạt động</td>
              <td>
<div className={classes.actions}>
                      <a href="#"><AiOutlineEdit/></a>
                      <a href="#" style={{color: "red"}}><AiOutlineDelete/></a>
                      
                  </div>
              </td>
          </tr>
          <tr>
              <td><input type="checkbox" /></td>
              <td>4</td>
              <td>Vũ Mạnh Đức</td>
              <td>ngan01@gmail.com</td>
              <td>Khách hàng mới</td>
              <td>Hoạt động</td>
              <td>
<div className={classes.actions}>
                      <a href="#"><AiOutlineEdit/></a>
                      <a href="#" style={{color: "red"}}><AiOutlineDelete/></a>
                      
                  </div>
              </td>
          </tr>
      </tbody>
  </table>);
};

export default Table;
