import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import instance from "../../axios";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import { toast } from "react-toastify";

const AlluserPage = () => {
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    isAdmin: false,
  });
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  console.log(userData);

  const getAllUser = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/admin/getAllUsers`);
      if (data?.success) {
        setLoading(false);
        setAllUser(data?.users);
      } else {
        setLoading(false);
        setAllUser([]);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // Handle checkbox state change
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    setUserData((prev) => ({
      ...prev,
      isAdmin: !isChecked,
    }));
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Update user details
  const handleSubmit = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      const { data } = await instance.put(
        `/api/user/updateUser/${selectedUser._id}`,
        userData
      );
      if (data.success) {
        toast.success(data?.message);
        setAllUser((prev) =>
          prev.map((user) =>
            user._id === selectedUser._id ? { ...user, ...userData } : user
          )
        );
        setIsOpen(false);
      }
    } catch (error) {
      toast.error(error.message);
      console.error("Error updating user:", error);
    } finally {
      setLoading(false);
    }
  };

  // Sync selected user data
  useEffect(() => {
    if (selectedUser) {
      setUserData({
        name: selectedUser.name || "",
        email: selectedUser.email || "",
        address: selectedUser.address || "",
        phone: selectedUser.phone || "",
        isAdmin: selectedUser.isAdmin || false,
      });
      setIsChecked(selectedUser.isAdmin || false);
    }
  }, [selectedUser]);

  useEffect(() => {
    getAllUser();
  }, []);

  useEffect(() => {
    setIsChecked(selectedUser?.isAdmin || false);
  }, [selectedUser]);

  const onClose = () => {
    setIsOpen(false);
  };

  return (
    <AdminLayout>
      <div className="">
        <div className="todo">
          <div className="flex items-center  justify-between mb-3">
            <h3 className="font-bold text-xl">সকল কাস্টমার সমূহ </h3>
            <div>
              <i className="bx bx-plus mr-4"></i>
              <i className="bx bx-filter"></i>
            </div>
          </div>
          <span className="mt-3 mb-3 text-base font-normal text-gray-500 dark:text-gray-400">
            এটা সকল ট্রানজেকশনের একটা তালিকা
          </span>

          <ul className="flex flex-col gap-2 mt-4">
            {allUser?.length === 0 ? (
              <li>Not Found</li> // Display "Not Found" if users array is empty
            ) : (
              allUser?.map((user, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center border-b-2  pb-2 bg-gray-300 px-3 py-2 rounded-lg"
                >
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-4 sm:gap-4 items-center">
                    <div className="flex justify-between items-center gap-2">
                      <img
                        className="h-16 w-16 rounded-full"
                        src={user?.image}
                        alt=""
                      />
                      <p className="text-sm font-bold sm:font-normal sm:text-xl ">
                        {user?.name}
                      </p>
                    </div>
                    <p className="text-sm">{user?.email}</p>
                    <p className="text-sm">{user?.address}</p>
                    <p className="text-sm">{user?.phone}</p>
                  </div>

                  <button
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedUser(user);
                    }}
                    className="px-2 py-2"
                  >
                    <i className="bx bx-dots-vertical-rounded"></i>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 sm:mt-14 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-xl ml-16 mt-14 mr-1 sm:ml-0 sm:mt-0 sm:mr-0 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            {/* Modal Container for Scroll */}
            <div className="max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-700">
                <h3 className="text-lg font-semibold dark:text-white">
                  আপডেট কাস্টমার
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1"
                  onClick={onClose}
                >
                  <ImCross />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="productName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        কাস্টমারের নাম
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                        placeholder="নাম"
                        value={userData?.name}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="productName"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        কাস্টমারের মোবাইল নাম্বার
                      </label>
                      <input
                        type="text"
                        id="phone"
                        name="phone"
                        className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                        placeholder="কাস্টমারের মোবাইল নাম্বার "
                        value={userData?.phone}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="title"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        কাস্টমারের ঠিকানা
                      </label>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                        placeholder="কাস্টমারের ঠিকানা"
                        value={userData?.address}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="price"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        কাস্টমারের ইমেইল
                      </label>
                      <input
                        type="text"
                        id="email"
                        name="email"
                        className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                        placeholder="কাস্টমারের ইমেইল"
                        disabled
                        value={userData?.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <div className="flex items-center mb-4">
                        <input
                          id="default-checkbox"
                          type="checkbox"
                          checked={isChecked}
                          onChange={handleCheckboxChange}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="default-checkbox"
                          className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                        >
                          {isChecked
                            ? `${selectedUser?.name} এখন এডমিন`
                            : "এডমিন কিনা"}
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>

              {/* Modal Footer */}
              <div className="flex justify-end p-4 border-t dark:border-gray-700">
                <button
                  type="button"
                  className={`px-5 py-2.5 rounded-lg font-medium border-2 border-green-400 hover:bg-green-400 hover:text-white transition duration-150`}
                  onClick={handleSubmit}
                  disabled={loading}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </AdminLayout>
  );
};

export default AlluserPage;
