import { useEffect, useState } from "react";
import instance from "../axios";
import Layout from "../components/Layout/Layout";
import { useAuthContext } from "../Context/AuthContex";

const ProfilePage = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const { user } = useAuthContext();

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

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-4xl w-full bg-white rounded-lg shadow-lg p-6">
          {/* Header Section */}
          <div className="flex flex-col items-center">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-500">
              <img
                src={user?.image}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mt-4">
              {user?.name}
            </h2>
            <p className="text-gray-600">Our Luckyest Customer</p>
            <button className="mt-4 px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition">
              Edit Profile
            </button>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mt-8">
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-gray-800">
                {orders?.length ? orders?.length : "0"}
              </span>
              <span className="text-gray-600">Total Order</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-gray-800">
                {orders?.length === 0
                  ? "0"
                  : orders.reduce(
                      (acc, current) => acc + Number(current?.totalPrice),
                      0
                    )}
              </span>
              <span className="text-gray-600">Totol Pay</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xl font-bold text-gray-800">
                {orders?.length ? orders?.length : "0"}
              </span>
              <span className="text-gray-600">Checktout</span>
            </div>
          </div>

          {/* Contact Section */}
          <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Contact Information
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Gender:</strong> Male
              </li>
              <li>
                <strong>Phone:</strong> {user?.phone ? user?.phone : "017....."}
              </li>
              <li>
                <strong>Email:</strong> {user?.email}
              </li>
              <li>
                <strong>Address:</strong> {user?.address}
              </li>
            </ul>
          </div>

          {/* Order List Section */}
          {/* <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">Order List</h3>
            <ul className="text-gray-600 space-y-2">
              <li>Order #1: MacBook Pro - $2500</li>
              <li>Order #2: iPhone 14 - $999</li>
              <li>Order #3: AirPods Pro - $249</li>
            </ul>
          </div> */}

          {/* Payment History Section */}
          {/* <div className="mt-8">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              Payment History
            </h3>
            <ul className="text-gray-600 space-y-2">
              <li>Payment #1: $2500 on 2024-01-15</li>
              <li>Payment #2: $999 on 2024-02-10</li>
              <li>Payment #3: $249 on 2024-03-05</li>
            </ul>
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
