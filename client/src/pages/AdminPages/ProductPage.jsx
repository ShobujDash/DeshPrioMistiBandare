import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../axios";
import Breadcrumb from "../../components/AdminComponents/Breadcrumb";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import DeleteModal from "../../components/AdminComponents/Modal/DeleteModal";
import Toolbar from "../../components/AdminComponents/NewBreadcumb/ProductToolBar";
import Checkbox from "../../components/AdminComponents/Product/Checkbox";
import { useAdminContext } from "../../Context/AdminContext";

const ProductPage = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  // const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const { getAllProductsData, products, setProducts } = useAdminContext();

  let publicId = selectedProduct?.imageId.split("/")[1];
  console.log(publicId);

  // const getAllProductsData = async () => {
  //   try {
  //     const { data } = await instance.get("/api/common/getAllProducts");
  //     if (data?.success) {
  //       setProducts(data?.products);
  //     } else if (!data?.success) {
  //       setProducts([]);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const delteImageFormcludinary = async () => {
    await instance.delete(`/api/media/delete/${publicId}`);
    console.log("image is delete");
  };

  const deleteProduct = async () => {
    try {
      await delteImageFormcludinary();
      const { data } = await instance.delete(
        `/api/admin/delete-product/${selectedProduct?._id}`
      );
      if (data?.success) {
        toast.success(data?.message);
        await getAllProductsData();
        return true;
      }
    } catch (error) {
      console.log(error);
      toast.error(data?.message);
    }
  };

  useEffect(() => {
    getAllProductsData();
  }, []);

  return (
    <>
      <AdminLayout>
        <Breadcrumb pageName="Product" />
        <div className="container mx-auto">
          <Toolbar pageName={"Product"} />
          {/* <Product /> */}
          <div className="container rounded-sm mx-auto">
            <div className="flex flex-col ">
              <div className="overflow-x-auto">
                <div className="inline-block min-w-full align-middle">
                  <div className="overflow-hidden shadow">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed dark:divide-gray-600">
                      <thead className="bg-gray-100 dark:bg-gray-700">
                        <tr>
                          <th scope="col" className="p-4">
                            <div className="flex items-center">
                              <input
                                id="checkbox-all"
                                aria-describedby="checkbox-1"
                                type="checkbox"
                                className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
                              />
                              <label htmlFor="checkbox-all" className="sr-only">
                                checkbox
                              </label>
                            </div>
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            ID
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Name
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Image
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Title
                          </th>

                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Price
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Description
                          </th>
                          <th
                            scope="col"
                            className="p-4 text-xs font-medium text-left text-gray-500 uppercase dark:text-gray-400"
                          >
                            Actions
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200 dark:bg-gray-800 dark:divide-gray-700">
                        {products.length === 0 ? (
                          <div className="flex justify-center items-center w-full h-full">
                            <h1>Not Found Any Data</h1>
                          </div>
                        ) : (
                          products.map((product, index) => (
                            <tr
                              key={product?._id}
                              className="hover:bg-gray-100 dark:hover:bg-gray-700"
                            >
                              <td className="w-4 p-4">
                                <Checkbox id={product?.id} label="checkbox" />
                              </td>
                              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {index + 1}
                              </td>
                              <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                                <div className="text-base font-semibold text-gray-900 dark:text-white">
                                  {product?.productName}
                                </div>
                              </td>
                              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                                  <img
                                    className="w-12 h-12 rounded-full border-2 border-red-500 shadow-lg shadow-gray-500"
                                    src={product?.image}
                                    alt="image"
                                  />
                                </div>
                              </td>
                              <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
                                <div className="text-sm font-normal text-gray-500 dark:text-gray-400 ">
                                  {product?.title}
                                </div>
                              </td>

                              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.price}
                              </td>
                              <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                {product.shortDes}
                              </td>
                              <td className="p-4 space-x-2 whitespace-nowrap">
                                <button
                                  type="button"
                                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-700 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                  onClick={() => setSelectedProduct(product)}
                                >
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                    <path
                                      fillRule="evenodd"
                                      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Update
                                </button>
                                <button
                                  type="button"
                                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                                  onClick={() => {
                                    setModalOpen(true);
                                    setSelectedProduct(product);
                                  }}
                                >
                                  <svg
                                    className="w-4 h-4 mr-2"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      fillRule="evenodd"
                                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                      clipRule="evenodd"
                                    />
                                  </svg>
                                  Delete item
                                </button>
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <DeleteModal
            isOpen={isModalOpen}
            onClose={() => setModalOpen(false)}
            onDelete={deleteProduct} // Renamed prop for clarity
          />
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductPage;
