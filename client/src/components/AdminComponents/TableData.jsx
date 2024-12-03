import React, { useState, useEffect } from "react";
import people from "../../assets/people.png";
import instance from "../../axios";

const TableData = () => {
  const [users, setUsers] = useState([]); // Initialize state properly

  // Function to fetch all users
  const getAllUser = async () => {
    try {
      const { data } = await instance.get("/api/admin/getAllUsers");
      if (data?.success) {
        setUsers(data?.users);
      } else {
        setUsers([]); // Reset to empty if no data
      }
    } catch (error) {
      console.log("Something went wrong from Dashboard User List");
      setUsers([]); // Reset to empty on error
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    getAllUser();
  }, []);

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
                <img src={people} alt="user" />
                <p>John Doe</p>
              </td>
              <td>01-10-2021</td>
              <td>
                <span className="status completed">Completed</span>
              </td>
            </tr>
            <tr>
              <td>
                <img src={people} alt="user" />
                <p>John Doe</p>
              </td>
              <td>01-10-2021</td>
              <td>
                <span className="status pending">Pending</span>
              </td>
            </tr>
            <tr>
              <td>
                <img src={people} alt="user" />
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
          <h3>User</h3>
          <i className="bx bx-plus"></i>
          <i className="bx bx-filter"></i>
        </div>
       
        <ul className="flex flex-col gap-2">
          {users?.length === 0 ? (
            <li>Not Found</li> // Display "Not Found" if users array is empty
          ) : (
            users.slice(0, 3).map((user, index) => (
              <li  key={index} className="flex justify-between items-center border-b-2  pb-2">
                <div className="flex items-center">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={user?.image}
                    alt=""
                  />
                  <p className="text-xl">{user.name}</p>
                </div>

                <i className="bx bx-dots-vertical-rounded"></i>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default TableData;
