import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import instance from "../../axios";
import Breadcrumb from "../../components/AdminComponents/Breadcrumb";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import Loading from "../../components/Loading";
import { useAdminContext } from "../../Context/AdminContext";
import { useAuthContext } from "../../Context/AuthContex";

const UserProductsAddOrUpdate = () => {
  const { user } = useAuthContext();
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedProductId, setSelectedProductId] = useState("");
  const [selectedProductPrice, setSelectedProductPrice] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const { products } = useAdminContext();

  console.log(products);

  useEffect(() => {
    (async function () {
      try {
        const { data } = await instance.get("/api/admin/getAllUsers");

        if (data?.success) {
          setAllUsers(data?.users);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    })();
  }, []);

  const getSelectedUserData = async () => {
    try {
      const { data } = await instance.get(`/api/user/${selectedUserId}`);
      if (data?.success) {
        setSelectedUser(data?.user);
      }
    } catch (error) {
      console.log("soemthign went wrong");
    }
  };


  useEffect(() => {
    if (selectedUserId) {
      getSelectedUserData();
    }
  }, [selectedUserId]);

  // Update selectedPrduct when selectedUserId changes
  useEffect(() => {
    if (selectedProductId) {
      const singleProduct = products.find(
        (product) => product?._id === selectedProductId
      );
      setSelectedProductPrice(singleProduct?.price);
    } else {
      setSelectedProductPrice(null); // Clear selectedUser if no user is selected
    }
  }, [selectedProductId, allUsers]);

  // handle add porduct
  const handleAddProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.post(
        "/api/admin/add-or-update-users-product",
        {
          userId: selectedUserId,
          productId: selectedProductId,
          price: selectedProductPrice,
        }
      );
      if (data?.success) {
        setLoading(false);
        await getSelectedUserData();
        toast.success(data?.message);
      } else {
        setLoading(false);
        toast.error(data?.message);
      }
    } catch (error) {
      setLoading(false);
      toast.error(data?.message);
    }
  };

  // handle delete produt
  // const handleDelteUserProduct = async (id) => {
  //   try {
  //     setLoading(true)
  //     const { data } = await instance.delete(
  //       `/api/admin/delete-users-product`,
  //       { userId: selectedUserId, productId: id }
  //     );
  //     if (data?.success) {
  //       setLoading(false);
  //       await getSelecetdUserData();
  //       toast.success(data?.message)
  //     }
  //   } catch (error) {
  //     setLoading(false)
  //     toast.error(error.message)
  //   }
  // }
const handleDelteUserProduct = async (id) => {
  try {
    setLoading(true);
    const { data } = await instance.delete(`/api/admin/delete-users-product`, {
      params: { userId: selectedUserId, productId: id },
    });
    if (data?.success) {
      await getSelectedUserData(); // Fetch updated data
      toast.success(data?.message);
    }
  } catch (error) {
    toast.error(error.message);
  } finally {
    setLoading(false);
  }
};


  
  return (
    <AdminLayout>
      <Breadcrumb pageName="User Products" />

      <div className="w-full bg-slate-200 h-auto rounded-lg  mx-1  mt-8 pb-2">
        <div className="mx-1">
          <div className="flex flex-col gap-1">
            <label className="mx-1 text-xl">Select User</label>
            <select
              value={selectedUserId}
              onChange={(e) => setSelectedUserId(e.target.value)}
              className="w-full sm:w-72 px-2 py-1 rounded-lg"
            >
              <option value="">All</option>
              {allUsers?.map((user) => (
                <option key={user?._id} value={user?._id}>
                  {user?.name || "Unnamed User"}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1  sm:grid-cols-2 md:grid-cols-3 gap-5 text-center mt-6   rounded-lg">
          <div className="flex flex-row items-center gap-2">
            <label className="ml-1 text-xl">Product</label>
            <select
              value={selectedProductId}
              onChange={(e) => setSelectedProductId(e.target.value)}
              className="w-full sm:w-72 px-2 py-1 rounded-lg"
            >
              <option value="">All</option>
              {products?.map((product) => (
                <option key={product?._id} value={product?._id}>
                  {product?.productName || "Unnamed Product"}
                </option>
              ))}
            </select>
          </div>
          <div className="flex flex-row items-center gap-1">
            <label className="mx-1 text-xl">Price</label>
            <input
              onChange={(e) => setSelectedProductPrice(e.target.value)}
              value={selectedProductPrice}
              type="text"
              placeholder="price"
              className="w-full sm:w-72 px-2 py-1 rounded-lg"
            />
          </div>
          <div>
            <button
              onClick={handleAddProduct}
              className="px-3 py-1 text-center bg-blue-400 text-gray-600 rounded-md text-xl shadow-lg hover:bg-blue-800 transition-all duration-300 hover:text-gray-100"
            >
              {loading ? <Loading /> : "Add"}
            </button>
          </div>
        </div>
      </div>

      <div className="w-ful bg-slate-200 h-auto rounded-lg  mx-1  mt-8 pb-2">
        <h1 className="text-xl p-2">{`${selectedUser?.name} Product List`}</h1>

        <div className="w-full overflow-x-auto sm:overflow-x-hidden">
          <table className="min-w-full  divide-y divide-gray-200 table-fixed dark:divide-gray-600">
            <thead className="bg-gray-100 dark:bg-gray-700">
              <tr>
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
                  Product_name
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
                  Price
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
              {selectedUser?.products.length === 0 ? (
                <div className="flex justify-center items-center w-full h-full">
                  <h1 className="p-1 ">Not Found Any Data</h1>
                </div>
              ) : (
                selectedUser?.products?.map((product, index) => (
                  <tr
                    key={product?._id}
                    className="hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {index + 1}
                    </td>
                    <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
                      <div className="text-base font-semibold text-gray-900 dark:text-white">
                        {product?.productId?.productName}
                      </div>
                    </td>
                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
                        <img
                          className="w-12 h-12 rounded-full border-2 border-red-500 shadow-lg shadow-gray-500"
                          src={product?.productId?.image}
                          alt="image"
                        />
                      </div>
                    </td>
                    <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {product.price}
                    </td>
                    <td className="p-4 space-x-2 whitespace-nowrap">
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
                        onClick={() =>
                          handleDelteUserProduct(product?.productId?._id)
                        }
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
    </AdminLayout>
  );
};

export default UserProductsAddOrUpdate;
