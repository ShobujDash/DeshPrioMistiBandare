import Layout from "../components/Layout/Layout";
import bksash from '../assets/bkash.png'

const OrderPage = () => {

  

  return (
    <Layout>
      <div className="min-h-[81vh] sm:px-12 px-1 py-5">
        <h1 className="text-2xl text-center font-bold text-gray-500 mb-4">
          Order List
        </h1>

        <div className=" w-full flex justify-between items-center mb-3 shadow-lg px-2 py-3 rounded-xl bg-gray-200">
          <div className="flex gap-2">
            <span className="hidden sm:block">1.</span>
            <span className="text-sm text-center font-semibold text-red-500 ">
              Order
            </span>
          </div>
          <p>৳1200</p>
          <p className="py-1 px-2 bg-green-300 rounded-full text-gray-700">Success</p>
          <button className="bg-blue-400 py-1 px-2 rounded-md text-gray-700 flex items-center gap-2">
            <img
              className="w-6 h-6"
              src={bksash} alt="bkash" />
            Payment
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPage;
