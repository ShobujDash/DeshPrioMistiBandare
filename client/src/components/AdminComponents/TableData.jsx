import React, { useState, useEffect } from "react";
import people from "../../assets/people.png";
import instance from "../../axios";
import { useNavigate } from "react-router-dom";

const TableData = ({ allOrder, allUser }) => {

  const navigate = useNavigate();

  return (
    <div className="table-data">
      <div className="order">
        <div className="head">
          <h3>সম্প্রীতিক অর্ডার </h3>
          <button
            onClick={() => navigate("/admin/allorder")}
            className="px-3 py-1 border-2 border-green-500 rounded-md hover:bg-green-400 hover:text-white transition duration-300"
          >
            সব অর্ডার{" "}
          </button>
          <i className="bx bx-search"></i>
          <i className="bx bx-filter"></i>
        </div>
        <table>
          <thead>
            <tr>
              <th>কাস্টমার </th>
              <th>অর্ডারের ডেট</th>
              <th>টাকা</th>
              <th>স্টেটাস</th>
              <th>পেমেন্ট </th>
            </tr>
          </thead>
          <tbody>
            {allOrder?.length === 0 ? (
              <li>Not Found</li> // Display "Not Found" if users array is empty
            ) : (
              allOrder.slice(0, 3).map((order) => (
                <tr key={order?._id}>
                  <td>
                    <img className="hidden sm:block" src={order?.userID?.image} alt="user" />
                    <p>{order?.userID?.name ? order?.userID?.name : ""}</p>
                  </td>
                  <td>{order?.createdAt.split("T")[0]}</td>
                  <td>৳ {order?.totalPrice}</td>
                  <td>
                    <span
                      className={`py-1 px-1  ${
                        order?.order === "pending"
                          ? "bg-red-600"
                          : order?.order === "process"
                          ? "bg-yellow-600"
                          : "bg-green-300"
                      } rounded-md text-gray-700`}
                    >
                      {order?.order}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`py-1 px-2 border-2 ${
                        order?.payment ? "border-green-500" : "border-red-500"
                      } rounded-md text-gray-700`}
                    >
                      {order?.payment ? "হয়েছে " : "হয়নি"}
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
          <h3>কাস্টমার </h3>
          <button
            onClick={() => navigate("/admin/alluser")}
            className="px-3 py-1 border-2 border-green-500 rounded-md hover:bg-green-400 hover:text-white transition duration-300"
          >
            সব কাস্টমার{" "}
          </button>
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
                <div className="flex items-center gap-2">
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
