import React from "react";
import people from "../../assets/people.png";

const TableData = () => {
  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>Recent Orders</h3>
          <i className="bx bx-search"></i>
          <i className="bx bx-filter"></i>
        </div>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Date Order</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <img src="img/people.png" alt="user" />
                <p>John Doe</p>
              </td>
              <td>01-10-2021</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>
            <tr>
              <td>
                <img src="img/people.png" alt="user" />
                <p>John Doe</p>
              </td>
              <td>01-10-2021</td>
              <td>
                <span className="status pending">Pending</span>
              </td>
            </tr>
            <tr>
              <td>
                <img src="img/people.png" alt="user" />
                <p>John Doe</p>
              </td>
              <td>01-10-2021</td>
              <td>
                <span className="status process">Process</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="todo">
        <div className="head">
          <h3>Todos</h3>
          <i className="bx bx-plus"></i>
          <i className="bx bx-filter"></i>
        </div>
        <ul className="todo-list">
          <li className="completed">
            <p>Todo List</p>
            <i className="bx bx-dots-vertical-rounded"></i>
          </li>
          <li className="not-completed">
            <p>Todo List</p>
            <i className="bx bx-dots-vertical-rounded"></i>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default TableData;
