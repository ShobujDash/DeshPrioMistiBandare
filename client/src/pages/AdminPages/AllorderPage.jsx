import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../axios";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";

const AllorderPage = () => {
  const [allOrder, setAllOrder] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderID, setSelectedOrderID] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const [orderStatus, setOrderStatus] = useState("");
  const [isMobileView, setIsMobileView] = useState(false);

  console.log(selectedOrder);
  console.log(isMobileView);

  const getAllOrder = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/order/getAllOrders`);
      if (data?.success) {
        setAllOrder(data?.orders);
      } else {
        setAllOrder([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllOrder();

    // Detect if the device is in mobile view
    const handleResize = () => {
      setIsMobileView(window.innerWidth <= 640); // Tailwind's `sm` breakpoint
    };

    handleResize(); // Initial check
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleChange = (event) => {
    setOrderStatus(event.target.value);
  };
  const handleStatusClicked = (oderId, e) => {
    e.stopPropagation();
    setSelectedOrderID(oderId);
    setStatus(true);
  };

  const updateOrder = {
    totalPrice: selectedOrder?.totalPrice,
    order: orderStatus || selectedOrder?.order,
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await instance.put(
          `/api/order/updateOrder/${selectedOrderID}`,
          updateOrder
        );
        if (data?.success) {
          toast.success(data?.message);
          setLoading(false);
          setStatus(false);
          await getAllOrder();
        } else {
          toast.error(data?.message);
          setLoading(false);
          setStatus(false);
        }
      } catch (error) {
        setLoading(false);
        setStatus(false);
        console.log(error);
      }
    })();
  }, [orderStatus]);



  return (
    <AdminLayout>
      <div className="table-data">
        {/* Order List */}
        {!selectedOrder || !isMobileView ? (
          <div className="order">
            <div className="head">
              <h3 className="text-green-500">সব অর্ডার</h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <div className="-mt-3 mb-5">
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                এটা সকল অর্ডারের একটা তালিকা
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>কাস্টমার</th>
                  <th>অর্ডারের ডেট</th>
                  <th>টাকা</th>
                  <th>স্টেটাস</th>
                  <th>পেমেন্ট </th>
                </tr>
              </thead>
              <tbody>
                {allOrder?.length === 0 ? (
                  <li>Not Found</li>
                ) : (
                  allOrder?.map((order) => (
                    <tr
                      className="cursor-pointer"
                      onClick={() => setSelectedOrder(order)}
                      key={order?._id}
                    >
                      <td>
                        <img
                          className="hidden sm:block"
                          src={order?.userID?.image}
                          alt="user"
                        />
                        <p>{order?.userID?.name || ""}</p>
                      </td>
                      <td>{order?.createdAt.split("T")[0]}</td>
                      <td>৳ {order?.totalPrice}</td>
                      <td onClick={(e) => handleStatusClicked(order?._id, e)}>
                        {order?._id === selectedOrderID && status ? (
                          <div>
                            <select
                              id="categoryID"
                              name="categoryID"
                              className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-[120px] p-2.5 dark:bg-gray-700"
                              value={orderStatus}
                              onChange={(e) => handleChange(e)}
                            >
                              <option value="completed">Select One</option>
                              <option value="completed">completed</option>
                              <option value="process">process</option>
                              <option value="pending">pending</option>
                            </select>
                          </div>
                        ) : (
                          <span
                            className={`py-1 px-2 text-gray-200 ${
                              order?.order === "pending"
                                ? "bg-red-600"
                                : order?.order === "process"
                                ? "bg-yellow-600"
                                : "bg-green-300"
                            } rounded-md text-gray-700`}
                          >
                            {order?.order}
                          </span>
                        )}
                      </td>
                      <td>
                        <span
                          className={`py-1 px-2 border-2 ${
                            order?.payment
                              ? "border-green-500"
                              : "border-red-500"
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
        ) : null}

        {/* Selected Order Details */}
        {selectedOrder && (
          <div className={`order ${isMobileView ? "" : "hidden sm:block"}`}>
            {isMobileView && (
              <button
                className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
                onClick={() => setSelectedOrder(null)}
              >
                পেছনে ফিরে যান
              </button>
            )}
            <div className="head mt-3">
              <h3 className="text-green-500 text-xl sm:text-lg">
                {selectedOrder?.userID?.name || ""}{" "}
                <span className="text-green-400">
                  যেসব পণ্য অর্ডার করেছেন |
                </span>
              </h3>
              <i className="bx bx-search"></i>
              <i className="bx bx-filter"></i>
            </div>
            <div className="-mt-3 mb-5">
              <span className="text-base font-normal text-gray-500 dark:text-gray-400">
                এটা সকল পন্যের একটা তালিকা
              </span>
            </div>
            <table>
              <thead>
                <tr>
                  <th>পন্যের নাম</th>
                  <th>পরিমান</th>
                  <th>দাম</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.cartList?.map((product) => (
                  <tr key={product?._id}>
                    <td>
                      <img
                        src={product?.productId?.image}
                        alt="product image"
                      />
                      <p>{product?.productId?.productName}</p>
                    </td>
                    <td>{product?.qnty} কেজি</td>
                    <td>৳ {product?.price}</td>
                  </tr>
                ))}
                <tr>
                  <td></td>
                  <td className="font-semibold">মোট পরিমান</td>
                  <td className="font-semibold">মোট দাম</td>
                </tr>
                <tr>
                  <td></td>
                  <td className="text-green-500 font-bold">
                    {selectedOrder?.cartList?.reduce(
                      (acc, curr) => acc + Number(curr?.qnty),
                      0
                    )}{" "}
                    কেজি
                  </td>
                  <td className="text-green-500 font-bold">
                    ৳ {selectedOrder?.totalPrice}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AllorderPage;
