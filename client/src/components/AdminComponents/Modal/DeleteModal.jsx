// import { useState } from "react";
// import { toast } from "react-toastify";
// import instance from "../../../axios";
// import { useAdminContext } from "../../../Context/AdminContext";
// import FileUpload from "../../FileUpload";
// import Loading from "../../Loading";
// import { useNavigate } from "react-router-dom";

import { useState } from "react";
import { toast } from "react-toastify";

// const DeleteModal = ({ isOpen, onClose, delete }) => {
//   if (!isOpen) return null;
 
//   const [isLoading, setIsLoading] = useState(false);
  

//   const { categories, getAllCategoirsData } = useAdminContext();

//   const handleDelete = async (params) => {
//     setIsLoading(true)
//     const delete = await delete()
//     if (delete) {
//       setIsLoading(false)
//     } else {
//       setIsLoading(false)
//     }
// }
 





//   return (
//     <div className="fixed ml-20 sm:ml-0 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
//       <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
//         {/* Modal Header */}
//         <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
//           <h3 className="text-xl font-semibold text-red-700 dark:text-white">
//             Delete item
//           </h3>
//           <button
//             type="button"
//             className="text-gray-400 hover:text-gray-900 dark:hover:text-white"
//             onClick={onClose}
//           >
//             <svg
//               className="w-5 h-5"
//               fill="currentColor"
//               viewBox="0 0 20 20"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
//                 clipRule="evenodd"
//               />
//             </svg>
//           </button>
//         </div>

//         {/* Modal Body */}
//         <div className="p-6 space-y-6">
//           {isLoading ? (
//             <Loading />
//           ) : (
//             <h1 className="">Are you sure you want to delete this ?</h1>
//           )}
//         </div>

//         {/* Modal Footer */}
//         <div className="flex justify-end p-6 gap-2 border-t dark:border-gray-700">
//           <button
//             type="button"
//             className={`px-5 py-2.5 rounded-lg font-medium  text-gray-200 border-2 bg-red-700 `}
//             onClick={handleDelete}
//           >
//             {isLoading ? "Deleting..." : "Delete"}
//           </button>
//           <button
//             type="button"
//             className={`px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-200 `}
//             onClick={onClose}
//           >
//             Cancel
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeleteModal;


const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const success = await onDelete(); // Call the function passed as a prop
      if (success) {
        toast.success("Item deleted successfully.");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete item.");
    } finally {
      setIsLoading(false);
      onClose(); // Close the modal after delete
    }
  };

  return (
    <div className="fixed ml-20 sm:ml-0 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
          <h3 className="text-xl font-semibold text-red-700 dark:text-white">
            Delete Item
          </h3>
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
          {isLoading ? (
            <p>Deleting...</p>
          ) : (
            <h1>Are you sure you want to delete this item?</h1>
          )}
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 gap-2 border-t dark:border-gray-700">
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg font-medium text-gray-200 bg-red-700"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Deleting..." : "Delete"}
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-lg font-medium text-gray-700 bg-gray-200"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
