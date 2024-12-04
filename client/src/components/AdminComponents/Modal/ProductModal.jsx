import { useState } from "react";
import { toast } from "react-toastify";

const ProductModal = ({ isOpen, onClose, pageName }) => {
  if (!isOpen) return null;
  const [categoryName, setCategoryName] = useState("");
  const [uploadedImageData, setUploadedImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track file upload status

  const buttonClasses = isLoading
    ? "text-gray-400 bg-gray-200 cursor-not-allowed"
    : "text-white bg-blue-900 hover:bg-blue-800 cursor-pointer";

  const handleUploadComplete = (data) => {
    console.log("Upload Complete:", data);
    setUploadedImageData(data);
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();

    const { url, publicId } = uploadedImageData;
    const categoryData = {
      categoryImg: url,
      imageId: publicId,
      categoryName,
    };
    try {
      const { data } = await instance.post(
        "/api/admin/addCategory",
        categoryData
      );
      if (data?.success) {
        toast.success(data?.message);

        // Reset form fields
        setCategoryName("");
        setUploadedImageData(null);

        // Close the modal
        onClose();
      }
    } catch (error) {
      toast.error("Something went wrong!");
      // Close the modal
      onClose();
    }
  };

  return (
    <div className="fixed ml-20 sm:ml-0 inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="relative w-full max-w-2xl bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-5 border-b rounded-t dark:border-gray-700">
          <h3 className="text-xl font-semibold dark:text-white">
            Add New {pageName}
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
          <form>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="first-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Bonnie"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="last-name"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="Green"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="example@company.com"
                  required
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="position"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Position
                </label>
                <input
                  type="text"
                  id="position"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="e.g. React developer"
                  required
                />
              </div>
              <div className="col-span-6">
                <label
                  htmlFor="biography"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Biography
                </label>
                <textarea
                  id="biography"
                  rows="4"
                  className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  placeholder="👨‍💻 Full-stack web developer. Open-source contributor."
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* Modal Footer */}
        <div className="flex justify-end p-6 border-t dark:border-gray-700">
          <button
            type="button"
            className={`px-5 py-2.5 rounded-lg font-medium ${buttonClasses}`}
            onClick={handleCategorySubmit}
            disabled={isLoading}
          >
            Add {pageName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;