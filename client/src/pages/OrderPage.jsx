import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BiMinus, BiPlus, BiTrash } from "react-icons/bi";
import { useAuthContext } from "../Context/AuthContex";
import bksash from "../assets/bkash.png";
import chef from "../assets/chef1.png";
import instance from "../axios";
import Layout from "../components/Layout/Layout";
import PaymentModal from "../components/PaymentModal ";

const OrderPage = () => {
  const { user } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState([]);
  const [selectedOrderTotalPrice, setSelectedOrderTotalPrice] = useState("");
  const [selectedOrderStatus, setSelectedOrderStatus] = useState("");
  console.log(selectedOrder);
  console.log(orders);

  const [loading, setLoading] = useState(true);

  const handlePayment = (e) => {
   e.stopPropagation();
  setIsOpen(true)
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await instance.get(`/api/order/getOrdersByUserID`);
        if (data?.success) {
          setLoading(false);
          setOrders(data?.orders);
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    })();
  }, []);

  if (loading)
    return (
      <Layout>
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mb-4 mt-5 mx-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-3 ">
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            </div>
          </div>

          {/* <span className="sr-only">Loading...</span> */}
        </div>
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mb-4 mt-5 mx-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-3 ">
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            </div>
          </div>

          {/* <span className="sr-only">Loading...</span> */}
        </div>
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 mb-4 mt-5 mx-2"
        >
          <div className="flex items-center justify-between">
            <div className="flex flex-row gap-3 ">
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
              <div className="h-5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
            </div>
          </div>

          {/* <span className="sr-only">Loading...</span> */}
        </div>
      </Layout>
    );

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 sm:gap-3">
        <div className="min-h-[81vh] sm:px-12 px-1 py-5 cu">
          <h1 className="text-2xl text-center font-bold text-gray-500 mb-4">
            Order List
          </h1>

          {orders.map((order) => (
            <div
              onClick={() => {
                setSelectedOrder(order?.cartList);
                setSelectedOrderTotalPrice(order?.totalPrice);
                setSelectedOrderStatus(order?.order);
              }}
              key={order?._id}
              className=" w-full flex justify-between items-center mb-3 shadow-lg px-2 py-3 rounded-xl bg-gray-200 cursor-pointer"
            >
              <div className="flex gap-2">
                <span className="hidden sm:block">1.</span>
                <span className="text-sm text-center font-semibold text-red-500 ">
                  Order
                </span>
              </div>
              <p>৳{order?.totalPrice}</p>
              <p
                className={`py-1 px-2 ${
                  order?.order === "pending"
                    ? "bg-red-600"
                    : order?.order === "process"
                    ? "bg-yellow-600"
                    : "bg-green-300"
                } rounded-full text-gray-700`}
              >
                {order?.order}
              </p>
              <button
                onClick={(e) => {
                  handlePayment(e);
                  setSelectedOrderTotalPrice(order?.totalPrice);
                }}
                className="bg-blue-400 py-1 px-2 rounded-md text-gray-700 flex items-center gap-2"
              >
                <img className="w-6 h-6" src={bksash} alt="bkash" />
                Payment
              </button>
            </div>
          ))}
        </div>

        <div className="min-h-[81vh] hidden md:block sm:px-12 px-1 py-5">
          <h1 className="text-2xl text-center font-bold text-gray-500 mb-4">
            Cart List
          </h1>

          <div className="w-full h-full bg-cartBg flex items-center justify-center rounded-t-[2rem]">
            {orders?.cartList?.length === 0 ? (
              <>
                <div className="w-full flex flex-col items-center gap-4">
                  <p className="text-2xl  text-[#b8b5b4] text-center pt-1 ">
                    Your cart is Empty
                  </p>
                  <img src={chef} alt="" className="w-[250px] h-[250px]" />
                </div>
              </>
            ) : (
              <>
                <div className="w-full h-full flex flex-col">
                  <div className="w-full h-[400px] md:h-42 px-6 py-8 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
                    {selectedOrder.map((item, index) => (
                      <div
                        key={index}
                        className="w-full px-4 h-[70px] rounded-lg bg-cartItem flex items-center justify-between shadow-md gap-6"
                      >
                        <div className="flex items-center gap-6 ">
                          <img
                            src={
                              user
                                ? item?.productId?.image || item?.image
                                : item?.image
                            }
                            alt={
                              user
                                ? item?.productId?.productName ||
                                  item?.productName
                                : item?.productName
                            }
                            className="w-16 h-16 max-w-[60px] rounded-full object-contain"
                          />
                          <div className="flex flex-col ">
                            <p className=" text-sm text-gray-500">
                              {user
                                ? item?.productId?.productName ||
                                  item?.productName
                                : item?.productName}
                            </p>
                            <p className="text-[13px] block text-gray-300 font-semibold">
                              <span className="text-red-600">৳ </span>
                              {item?.price}
                            </p>
                          </div>
                        </div>
                        <p className="text-center md:flex hidden text-[13px] text-gray-300 font-semibold">
                          <span className="text-red-600">৳ </span>
                          {item?.price * item?.qty}
                        </p>
                        <div className="flex items-center gap-6 ">
                          <div className="flex items-center gap-2">
                            <motion.button
                              // onClick={
                              //   item?.qty <= 1
                              //     ? () => handleRemove(item._id)
                              //     : () => handleDec(item)
                              // }
                              whileTap={{ scale: 0.75 }}
                            >
                              <BiMinus className="text-gray-50" />
                            </motion.button>
                            <p className="w-5 h-5 p-[13px] rounded-sm bg-cartBg text-gray-50 flex items-center justify-center">
                              {item?.qty}
                            </p>
                            <motion.button
                              // onClick={() => handleIncreament(item)}
                              whileTap={{ scale: 0.75 }}
                            >
                              <BiPlus className="text-gray-50" />
                            </motion.button>
                          </div>
                          <motion.div
                            // onClick={() => handleRemove(item._id)}
                            whileTap={{ scale: 0.76 }}
                          >
                            <BiTrash
                              size={19}
                              className="cursor-pointer text-red-500"
                            />
                          </motion.div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
                    <div className="w-full flex items-center justify-between">
                      <p className="text-gray-400 text-lg">Sub Total</p>
                      <p className="text-lg block text-gray-400 font-semibold">
                        <span className="text-red-600">৳ </span>ˆ
                        {selectedOrderTotalPrice}
                      </p>
                    </div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-gray-400 text-lg">Delivery Charge</p>
                      <p className="text-lg block text-gray-400 font-semibold">
                        <span className="text-red-600">৳ </span>
                        {/* {DELIVERY_CHARGE} */}0
                      </p>
                    </div>
                    <div className="w-full border-b border-gray-600 my-2"></div>
                    <div className="w-full flex items-center justify-between">
                      <p className="text-gray-400 text-xl font-semibold">
                        Total
                      </p>
                      <p className="text-gray-400 text-xl font-semibold">
                        <span className="text-red-600">৳ </span>
                        {selectedOrderTotalPrice}
                      </p>
                    </div>
                    <motion.button
                      // onClick={handleCheckout}
                      whileTap={{ scale: 0.85 }}
                      type="button"
                      className="w-full p-2 rounded-lg bg-orange-400 text-gray-50 text-lg my-2 hover:shadow-lg hover:bg-orange-600"
                    >
                      {selectedOrderStatus}
                    </motion.button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <PaymentModal
        isOpen={isOpen}
        closeModal={closeModal}
        price={selectedOrderTotalPrice}
      />
    </Layout>
  );
};

export default OrderPage;
