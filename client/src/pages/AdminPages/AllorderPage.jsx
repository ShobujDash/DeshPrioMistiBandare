import React, { useEffect, useState } from 'react'
import AdminLayout from '../../components/AdminComponents/Layout/AdminLayout';
import instance from '../../axios';

const AllorderPage = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [loading, setLoading] = useState("");

  const getAllOrder = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/order/getAllOrders`);
      if (data?.success) {
        setLoading(false);
        setAllOrder(data?.orders);
      } else {
        setLoading(false);
        setAllOrder([]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  return (
    <AdminLayout>
      <div className="table-data">
        <div className="order">
          <div className="head">
            <h3>সব অর্ডার </h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <div className="-mt-3 mb-5">
            <span className=" text-base font-normal text-gray-500 dark:text-gray-400">
              এটা সকল অর্ডারের একটা তালিকা
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th>কাস্টমার </th>
                <th>অর্ডারের ডেট</th>
                <th>টাকা</th>
                <th>স্টেটাস</th>
              </tr>
            </thead>
            <tbody>
              {allOrder?.length === 0 ? (
                <li>Not Found</li> // Display "Not Found" if users array is empty
              ) : (
                allOrder?.map((order) => (
                  <tr key={order?._id}>
                    <td>
                      <img src={order?.userID?.image} alt="user" />
                      <p>{order?.userID?.name ? order?.userID?.name : ""}</p>
                    </td>
                    <td>{order?.createdAt.split("T")[0]}</td>
                    <td>৳ {order?.totalPrice}</td>
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

        <div className="order">
          <div className="head">
            <h3>সব অর্ডার products</h3>
            <i className="bx bx-search"></i>
            <i className="bx bx-filter"></i>
          </div>
          <div className="-mt-3 mb-5">
            <span className=" text-base font-normal text-gray-500 dark:text-gray-400">
              এটা সকল অর্ডারের একটা তালিকা
            </span>
          </div>

          <table>
            <thead>
              <tr>
                <th>কাস্টমার </th>
                <th>অর্ডারের ডেট</th>
                <th>টাকা</th>
                <th>স্টেটাস</th>
              </tr>
            </thead>
            <tbody>
              {allOrder?.length === 0 ? (
                <li>Not Found</li> // Display "Not Found" if users array is empty
              ) : (
                allOrder?.map((order) => (
                  <tr key={order?._id}>
                    <td>
                      <img src={order?.userID?.image} alt="user" />
                      <p>{order?.userID?.name ? order?.userID?.name : ""}</p>
                    </td>
                    <td>{order?.createdAt.split("T")[0]}</td>
                    <td>৳ {order?.totalPrice}</td>
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
      </div>
    </AdminLayout>
  );
};

export default AllorderPage;
