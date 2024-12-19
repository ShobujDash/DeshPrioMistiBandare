import { useEffect, useState } from "react";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import instance from "../../axios";

const AllTranstionPage =() => {
  const [allPayment, setAllPayment] = useState([]);
  const [loading, setLoading] = useState("");

  const getAllPayment = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/payment`);
      if (data?.success) {
        setLoading(false);
        setAllPayment(data?.payments);
      } else {
        setLoading(false);
        setAllPayment([]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    getAllPayment();
  }, []);

  if (loading)
    return (
      <AdminLayout>
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
      </AdminLayout>
    );

  return (
    <AdminLayout>
      <div className="p-4 mt-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
        {/* Card Header */}
        <div className="items-center justify-between lg:flex">
          <div className="mb-4 lg:mb-0">
            <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
              সকল ট্রানজেকশন সমূহ
            </h3>
            <span className="text-base font-normal text-gray-500 dark:text-gray-400">
              এটা সকল ট্রানজেকশনের একটা তালিকা
            </span>
          </div>
        </div>

        {/* Table */}
        <div className="flex flex-col mt-6">
          <div className="overflow-x-auto rounded-lg">
            <div className="inline-block min-w-full align-middle">
              <div className="overflow-hidden shadow sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-600">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      {[
                        "Customer",
                        "Transaction",
                        "Amount",
                        "Reference number",
                        "Date & Time",
                        "Payment method",
                        "Status",
                      ].map((header) => (
                        <th
                          key={header}
                          className="p-4 text-xs font-medium tracking-wider text-left text-gray-500 uppercase dark:text-white"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="bg-white dark:bg-gray-800">
                    {/* Example Row */}
                    {allPayment?.length === 0 ? (
                      <li>Not Found</li>
                    ) : (
                      allPayment?.map((payment) => (
                        <tr
                          key={payment?._id}
                          className="bg-gray-50 dark:bg-gray-700"
                        >
                          <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            {payment?.userID?.name ? payment?.userID?.name : ""}
                          </td>
                          <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                            <span className="font-semibold">
                              {payment?.tranNum}
                            </span>
                          </td>
                          <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                            ৳{payment?.price}
                          </td>
                          <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {payment?.mobileNum}
                          </td>
                          <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {payment?.createdAt?.split("T")[0]}
                          </td>

                          <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                            bkash
                          </td>
                          <td className="p-4 whitespace-nowrap">
                            <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100 dark:bg-gray-700 dark:border-purple-500 dark:text-purple-400">
                              {/* {payment?.orderID?.order} */}
                              Success
                            </span>
                          </td>
                        </tr>
                      ))
                    )}

                    {/* <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="p-4 text-sm font-normal text-gray-900 whitespace-nowrap dark:text-white">
                      Payment from{" "}
                      <span className="font-semibold">Lana Byrd</span>
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                      Apr 15 ,2021
                    </td>
                    <td className="p-4 text-sm font-semibold text-gray-900 whitespace-nowrap dark:text-white">
                      $5000
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                      0018568911
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                      ••• 634
                    </td>
                    <td className="p-4 whitespace-nowrap">
                      <span className="bg-purple-100 text-purple-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-md border border-purple-100 dark:bg-gray-700 dark:border-purple-500 dark:text-purple-400">
                        In progress
                      </span>
                    </td>
                  </tr> */}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between pt-6">
          <button
            className="inline-flex items-center p-2 text-sm font-medium text-gray-500 rounded-lg hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            type="button"
          >
            Last 7 days
            <svg
              className="w-4 h-4 ml-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          <a
            href="#"
            className="inline-flex items-center p-2 text-xs font-medium uppercase rounded-lg text-primary-700 hover:bg-gray-100 dark:text-primary-500 dark:hover:bg-gray-700"
          >
            Transactions Report
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AllTranstionPage;
