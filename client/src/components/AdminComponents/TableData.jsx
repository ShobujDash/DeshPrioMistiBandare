import React, { useState, useEffect } from "react";
import people from "../../assets/people.png";
import instance from "../../axios";

const TableData = ({ allOrder, allUser }) => {
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
            {allOrder?.length === 0 ? (
              <li>Not Found</li> // Display "Not Found" if users array is empty
            ) : (
              allOrder.slice(0, 3).map((order) => (
                <tr key={order?._id}>
                  <td>
                    <img src={order?.userID?.image} alt="user" />
                    <p>{order?.userID?.name ? order?.userID?.name : ""}</p>
                  </td>
                  <td>{order?.createdAt.split("T")[0]}</td>
                  <td>
                    <span
                      className={`py-1 px-2  ${
                        order?.order === "pending"
                          ? "bg-red-600"
                          : order?.order === "process"
                          ? "bg-yellow-600"
                          : "bg-green-300"
                      } rounded-full text-gray-700`}
                    >
                      {order?.order}
                    </span>
                  </td>
                </tr>
              ))
            )}
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
          {allUser?.length === 0 ? (
            <li>Not Found</li> // Display "Not Found" if users array is empty
          ) : (
            allUser.slice(0, 3).map((user, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b-2  pb-2"
              >
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
