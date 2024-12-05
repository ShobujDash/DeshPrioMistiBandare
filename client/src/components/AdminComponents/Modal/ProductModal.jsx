import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../../axios";
import { useAdminContext } from "../../../Context/AdminContext";
import FileUpload from "../../FileUpload";

const ProductModal = ({ isOpen, onClose, pageName }) => {
  if (!isOpen) return null;

  const {
    getAllProductsData,
    products,
    setProducts,
    categories,
    getAllCategoirsData,
  } = useAdminContext();

  const [productData, setProductData] = useState({
    categoryID: "",
    productName: "",
    title: "",
    image: "",
    price: "",
    imageId: "",
    shortDes: "",
  });

  const [uploadedImageData, setUploadedImageData] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Track file upload status

  

  useEffect(() => {
    getAllCategoirsData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadComplete = (data) => {
    console.log("Upload Complete:", data);
    setUploadedImageData(data);
    setProductData((prev) => ({
      ...prev,
      image: data.url,
      imageId: data.publicId,
    }));
  };

  const handleProductSubmit = async (e) => {
    e.preventDefault();

    if (!uploadedImageData) {
      toast.error("Please upload an image");
      return;
    }
    console.log(productData,"ProductData")

    try {
      const { data } = await instance.post(
        "/api/admin/addProduct",
        productData
      );
      if (data?.success) {
        toast.success(data?.message);
        await getAllProductsData()

        // Reset form fields
        setProductData({
          categoryID: "",
          productName: "",
          title: "",
          image: "",
          price: "",
          imageId: "",
          shortDes: "",
        });
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

  const buttonClasses = isLoading
    ? "text-gray-400 bg-gray-200 cursor-not-allowed"
    : "text-white bg-blue-900 hover:bg-blue-800 cursor-pointer";

  return (
    <div className="fixed inset-0 z-50 sm:mt-14 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative w-full max-w-xl ml-16 mt-14 mr-1 sm:ml-0 sm:mt-0 sm:mr-0 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        {/* Modal Container for Scroll */}
        <div className="max-h-[90vh] overflow-y-auto">
          {/* Modal Header */}
          <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-700">
            <h3 className="text-lg font-semibold dark:text-white">
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
                    htmlFor="categoryID"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Select a Category
                  </label>
                  <select
                    id="categoryID"
                    name="categoryID"
                    className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                    value={productData.categoryID}
                    onChange={handleChange}
                  >
                    <option value="">Select a Category</option>
                    {categories.map((category) => (
                      <option key={category?._id} value={category?._id}>
                        {category?.categoryName}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="productName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    name="productName"
                    className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                    placeholder="Product Name"
                    value={productData.productName}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="title"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Title
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                    placeholder="Product Title"
                    value={productData.title}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="text"
                    id="price"
                    name="price"
                    className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                    placeholder="Product Price"
                    value={productData.price}
                    onChange={handleChange}
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="shortDes"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Product Description
                  </label>
                  <textarea
                    id="shortDes"
                    name="shortDes"
                    rows="4"
                    className="block w-full p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border dark:bg-gray-700"
                    placeholder="Enter a short description about the product."
                    value={productData.shortDes}
                    onChange={handleChange}
                  ></textarea>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <FileUpload
                    onLoading={setIsLoading}
                    onUploadComplete={handleUploadComplete}
                  />
                </div>
              </div>
            </form>
          </div>

          {/* Modal Footer */}
          <div className="flex justify-end p-4 border-t dark:border-gray-700">
            <button
              type="button"
              className={`px-5 py-2.5 rounded-lg font-medium ${buttonClasses}`}
              onClick={handleProductSubmit}
              disabled={isLoading}
            >
              Add {pageName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
