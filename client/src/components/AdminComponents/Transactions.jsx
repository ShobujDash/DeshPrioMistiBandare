import React from "react";

const Transactions = ({ allPayment }) => {
  console.log(allPayment)
  return (
    <div className="p-4 mt-5 bg-white border border-gray-200 rounded-lg shadow-sm dark:border-gray-700 sm:p-6 dark:bg-gray-800">
      {/* Card Header */}
      <div className="items-center justify-between lg:flex">
        <div className="mb-4 lg:mb-0">
          <h3 className="mb-2 text-xl font-bold text-gray-900 dark:text-white">
            Transactions
          </h3>
          <span className="text-base font-normal text-gray-500 dark:text-gray-400">
            This is a list of latest transactions
          </span>
        </div>
        {/* <div className="items-center sm:flex">
          <div className="flex items-center">
            <button
              id="dropdownDefault"
              className="mb-4 sm:mb-0 mr-4 inline-flex items-center text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 font-medium rounded-lg text-sm px-4 py-2.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
            >
              Filter by status
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
          </div>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="From"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
            <input
              type="text"
              placeholder="To"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-2.5 py-1.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            />
          </div>
        </div> */}
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
                    allPayment.slice(0, 3).map((payment) => (
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
                            {payment?.orderID?.order}
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
  );
};

export default Transactions;
