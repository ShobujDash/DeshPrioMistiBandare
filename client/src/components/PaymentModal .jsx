import { useState } from "react";
import { toast } from "react-toastify";
import instance from "../axios";
import QRCode from "../assets/QR_Code_Bkash_Antar.jpg"


const PaymentModal = ({ isOpen, closeModal, price, orderID }) => {
  const [inputData, setInputData] = useState({
    tranNum: "",
    mobileNum: "",
  });

  const changeData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputData({
      ...inputData,
      [name]: value,
    });
  };

  const handlePayment = async () => {
    try {
      const { data } = await instance.post("/api/payment/create", {
        ...inputData,
        price,
        orderID,
      });
      if (data?.success) {
        toast.success(data?.message);
        closeModal();
      } else {
        toast.error(data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-40 flex items-center justify-center bg-black bg-opacity-50">
          {/* Modal */}
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md md:max-w-4xl mx-4 md:mx-0 p-5 md:flex md:items-center">
            {/* Close Button */}
            {/* <button
              onClick={closeModal}
              className="absolute top-2 right-2 z-50 text-gray-500 hover:text-gray-800"
            >
              X
            </button> */}

            {/* Modal Content */}
            <div className="w-full">
              {/* Text Content */}
              <div className="mb-5">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-semibold mb-2 text-gray-800">
                    পেমেন্ট করুন
                  </h2>
                  <button
                    onClick={closeModal}
                    className="text-gray-300 hover:text-gray-100 bg-gray-800 px-2 py-1 rounded-full "
                  >
                    X
                  </button>
                </div>

                <p className="text-gray-700 leading-relaxed">
                  টোটাল <strong> {price} </strong> টাকা এই নাম্বার পেমেন্ট করুন
                  । <br /> <strong> বিকাশ পার্সোনালঃ 01827026482 </strong>।{" "}
                  <br />
                  তারপর আপনার ইমেলের মাধ্যমে সঠিক নির্দেশনা পাঠানো হবে।
                </p>
              </div>

              {/* QR Code and bkash */}
              <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between">
                <img
                  src={QRCode} // Replace with actual QR code link
                  alt="QR Code"
                  className="w-40 h-40 mb-4 md:mb-0"
                />

                <div className="text-center md:text-left">
                  <p className="font-bold mb-2 text-gray-800">
                    বিকাশ QR স্ক্যান করুন
                  </p>
                  <strong> 01786153786 </strong>
                  <p className="text-pink-600 text-lg font-semibold">bKash</p>
                </div>
              </div>

              {/* Input and Submit */}
              <div className="mt-5">
                <input
                  name="tranNum"
                  value={inputData.tranNum}
                  onChange={changeData}
                  type="text"
                  required
                  placeholder="আপনার ট্রান্সেকশন নাম্বার লিখুন"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-pink-500 mb-2"
                />
                <input
                  name="mobileNum"
                  value={inputData.mobileNum}
                  onChange={changeData}
                  type="number"
                  required
                  placeholder="প্রেরণকৃত নাম্বারটি লিখুন"
                  className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:border-pink-500"
                />
                <button
                  onClick={handlePayment}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md mt-3"
                >
                  কনফার্ম
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentModal;
