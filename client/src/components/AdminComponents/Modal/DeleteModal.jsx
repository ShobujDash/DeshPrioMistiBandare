import { useState } from "react";
import { toast } from "react-toastify";
import instance from "../../../axios";
import { useAdminContext } from "../../../Context/AdminContext";
import FileUpload from "../../FileUpload";

const DeleteModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;


  const handleDeteleItem =  async () => {
    try {
      onclose()
    } catch (error) {
      console.log(error)
      onclose()
    }
  }


  return (
    <div className="fixed ml-20 sm:ml-0 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
          <h3 className="text-xl font-semibold text-red-700 dark:text-white">Delete item</h3>
          <button
            type="button"
            className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
            onClick={onClose}
          >
            <svg
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6">
          <h1 className="">Are you sure you want to delete this product?</h1>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 gap-2 border-t dark:border-gray-700">
          <button
            type="button"
            className={`px-5 py-2.5 rounded-lg font-medium  text-gray-200 border-2 bg-red-700 cursor-not-allowed`}
            onClick={handleDeteleItem}
          >
            Delete 
          </button>
          <button
            type="button"
            className={`px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-200 cursor-not-allowed`}
            onClick={onclose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
