import instance from "@/axios";
import { DatePickerDemo } from "@/components/DatePicker";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/AdminComponents/Breadcrumb";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";

const TodaysCalculationPage = () => {
  const [store, setStore] = useState([]);
  const [storePorducts, setStoreProducts] = useState([]);
  const [todayEntryProduct, setTodayEntryProduct] = useState([]);
  const [todayExitProduct, todaySetExitProduct] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState("store");
  const [stateAdd, setStateAdd] = useState("");

  const [productName, setProductName] = useState("");
  const [productQnt, setProductQnt] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [date, setDate] = useState("");

  const handleClick = (p) => {
    setStateAdd(p);
    setIsOpen(true);
  };

  const datePick = (formattedDate) => {
    setDate(formattedDate);
  };

  const getStoreProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/todaycal/store/products`);
      if (data?.success) {
        setStore(data?.storePorducts);
      } else {
        setStore([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getTodayEntryProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/todaycal/entries/${date}`);
      if (data?.success) {
        setTodayEntryProduct(data?.entries);
      } else {
        setStoreProduct([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const getTodayExitProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/todaycal/exits/${date}`);
      if (data?.success) {
        todaySetExitProduct(data?.exits);
      } else {
        setStoreProduct([]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const addStoreProduct = async () => {
    try {
      setLoading(true);
      const { data } = await instance.post(`/api/storeproducts/`, {
        productName,
      });
      console.log(data);
      if (data?.success) {
        setLoading(false);
        toast.success(`${productName} যুক্ত হয়েছে`);
        setIsOpen(false);
        setProductName("");
        await getStoreAllProducts();
      } else if (data?.message === "This Product Is Already Exits") {
        setLoading(false);
        toast.error(`${productName} আছে অন্য কিছু যুক্ত করুন`);
        setIsOpen(false);
        setProductName("");
      } else {
        setIsOpen(false);
        setLoading(false);
        toast.error(data?.error);
      }
    } catch (error) {
      setLoading(false);
      setIsOpen(false);
      toast.error("কিছু ভুল হয়েছে আবার চেষ্টা করুন !!");
      console.error(error);
    }
  };

  const getStoreAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/storeproducts/`);
      if (data?.success) {
        setLoading(false);
        setStoreProducts(data?.data);
      } else {
        setLoading(false);
        toast.error(data?.error);
      }
    } catch (error) {
      setLoading(false);
      toast.error("কিছু ভুল হয়েছে আবার চেষ্টা করুন !!");
      console.error(error);
    }
  };

  const addTodayProductInStore = async () => {
    try {
      setLoading(true);
      const { data } = await instance.post(`/api/todaycal/store/entry`, {
        productName,
        qnt: productQnt,
        price: productPrice,
      });
      if (data?.success) {
        setLoading(false);
        toast.success("যুক্ত হয়েছে");
        setIsOpen(false);
        setProductName("");
        setProductQnt("");
        setProductPrice("");
        await getTodayEntryProduct();
        await getStoreProduct();
      } else {
        setLoading(false);
        toast.error("কিছু ভুল হয়েছে আবার চেষ্টা করুন !");
        setIsOpen(false);
        setProductName("");
        setProductQnt("");
        setProductPrice("");
      }
    } catch (error) {
      setLoading(false);
      toast.error("কিছু ভুল হয়েছে আবার চেষ্টা করুন !!");
      console.error(error);
      setIsOpen(false);
      setProductName("");
      setProductQnt("");
      setProductPrice("");
    }
  };
  const exitTodayProductFromStore = async () => {
    try {
      setLoading(true);
      const { data } = await instance.post(`/api/todaycal/store/exit`, {
        productName,
        qnt: productQnt,
        price: productPrice,
      });
      if (data?.success) {
        setLoading(false);
        toast.success("বাহির হয়েছে");
        setIsOpen(false);
        setProductName("");
        setProductQnt("");
        setProductPrice("");
        await getTodayExitProduct();
        await getStoreProduct();
      } else {
        setLoading(false);
        toast.error("কিছু ভুল হয়েছে আবার চেষ্টা করুন !");
        setIsOpen(false);
        setProductName("");
        setProductQnt("");
        setProductPrice("");
      }
    } catch (error) {
      setLoading(false);
      toast.error("কিছু ভুল হয়েছে আবার চেষ্টা করুন !!");
      console.error(error);
      setIsOpen(false);
      setProductName("");
      setProductQnt("");
      setProductPrice("");
    }
  };

  const handleSubmit = async () => {
    if (state === "store") {
      await addStoreProduct();
    } else if (state === "entry") {
      await addTodayProductInStore();
    } else if (state === "exist") {
      await exitTodayProductFromStore();
    } else {
      toast.error("কিছু ভুল হয়েছে আবার চেষ্টা করুন !");
    }
  };

  useEffect(() => {
    getStoreProduct();
    getTodayEntryProduct();
    getTodayExitProduct();
    getStoreAllProducts();
  }, []);
  useEffect(() => {
    getStoreProduct();
    getTodayEntryProduct();
    getTodayExitProduct();
  }, [date]);

  return (
    <AdminLayout>
      <Breadcrumb pageName="আজকের হিসাব" />
      <div className="w-full mx-auto">
        <Tabs defaultValue="store" className="w-full ">
          <TabsList>
            <TabsTrigger
              onClick={() => {
                setState("store");
                setDate("");
              }}
              className="sm:text-lg text-gray-900 sm:mr-10 shadow-lg shadow-gray-300"
              value="store"
            >
              জমা আছে
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setState("entry");
                setDate("");
              }}
              className="sm:text-lg text-gray-900 sm:mx-10 shadow-lg shadow-gray-300"
              value="entry"
            >
              প্রবেশ করল
            </TabsTrigger>
            <TabsTrigger
              onClick={() => {
                setState("exist");
                setDate("");
              }}
              className="sm:text-lg text-gray-900 sm:ml-10 shadow-lg shadow-gray-300"
              value="exist"
            >
              বাহির হলো
            </TabsTrigger>
          </TabsList>
          <TabsContent value="store">
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3 className="text-green-500">গৌডাউনে যেসব পণ্য জমা আছে</h3>
                  <i
                    onClick={() => handleClick("store")}
                    className="bx bx-plus px-2 py-1 bg-red-300 rounded-full text-xl hover:bg-red-600 text-white"
                  ></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>পন্যের নাম</th>
                      <th>পন্যের পরিমান</th>
                      <th>দাম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {store?.length === 0 ? (
                      <li>Not Found</li>
                    ) : (
                      store?.map((product) => (
                        <tr className="cursor-pointer" key={product?._id}>
                          <td>
                            <p>{product?.productName || ""}</p>
                          </td>
                          <td>{product?.qnt} কেজি</td>
                          <td>৳ </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="entry">
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3 className="text-green-500">আজকে যেসব পণ্য প্রবেশ করল</h3>
                  {state !== "store" && <DatePickerDemo datePick={datePick} />}
                  <i
                    onClick={() => handleClick("entry")}
                    className="bx bx-plus px-2 py-1 bg-red-400 rounded-full text-xl hover:bg-red-600 text-white"
                  ></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>পন্যের নাম</th>
                      <th>পন্যের পরিমান</th>
                      <th>দাম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayEntryProduct?.length === 0 ? (
                      <li>Not Found</li>
                    ) : (
                      todayEntryProduct?.map((product) => (
                        <tr className="cursor-pointer" key={product?._id}>
                          <td>
                            <p>{product?.productName || ""}</p>
                          </td>
                          <td>{product?.qnt} কেজি</td>
                          <td>৳ </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="exist">
            <div className="table-data">
              <div className="order">
                <div className="head">
                  <h3 className="text-green-500 sm:text-lg">
                    আজকে যেসব পণ্য বাহির হলো
                  </h3>
                  {state !== "store" && <DatePickerDemo datePick={datePick} />}
                  <i
                    onClick={() => handleClick("exist")}
                    className="bx bx-plus px-2 py-1 bg-red-300 rounded-full text-xl hover:bg-red-600 text-white"
                  ></i>
                </div>
                <table>
                  <thead>
                    <tr>
                      <th>পন্যের নাম</th>
                      <th>পন্যের পরিমান</th>
                      <th>দাম</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todayExitProduct?.length === 0 ? (
                      <li>Not Found</li>
                    ) : (
                      todayExitProduct?.map((product) => (
                        <tr className="cursor-pointer" key={product?._id}>
                          <td>
                            <p>{product?.productName || ""}</p>
                          </td>
                          <td>{product?.qnt} কেজি</td>
                          <td>৳ </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {isOpen ? (
        <div className="fixed inset-0 z-50 sm:mt-14 flex items-center justify-center bg-black bg-opacity-50">
          <div className="relative w-full max-w-xl ml-16 mt-14 mr-1 sm:ml-0 sm:mt-0 sm:mr-0 bg-white rounded-lg shadow-lg dark:bg-gray-800">
            {/* Modal Container for Scroll */}
            <div className="max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-4 border-b rounded-t dark:border-gray-700">
                <h3 className="text-lg font-semibold dark:text-white">
                  {stateAdd === "store"
                    ? "পন্য যুক্ত করুন"
                    : stateAdd === "entry"
                    ? "পন্য প্রবেশ করান"
                    : "পন্য  বাহির করুন"}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-900 dark:hover:text-white px-3 py-1"
                  onClick={() => setIsOpen(false)}
                >
                  <ImCross />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 space-y-6">
                <form>
                  <div className="grid grid-cols-6 gap-6">
                    {stateAdd === "store" ? (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="productName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          পন্যের নাম যুক্ত করুন
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                          placeholder="পন্যের নাম"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                        />
                      </div>
                    ) : (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="categoryID"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          পন্য নির্বাচন করুন
                        </label>
                        <select
                          id="categoryID"
                          name="categoryID"
                          className="bg-gray-50 border text-gray-900 text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          required
                        >
                          <option value="">পন্য নির্বাচন করুন</option>
                          {storePorducts.map((product) => (
                            <option
                              key={product?._id}
                              value={product?.productName}
                            >
                              {product?.productName}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    {stateAdd !== "store" && (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="productName"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          পণ্যের পরিমাণ
                        </label>
                        <input
                          type="number"
                          id="phone"
                          name="phone"
                          className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                          placeholder="পণ্যের"
                          value={productQnt}
                          onChange={(e) => setProductQnt(e.target.value)}
                          required
                        />
                      </div>
                    )}

                    {stateAdd !== "store" && (
                      <div className="col-span-6 sm:col-span-3">
                        <label
                          htmlFor="title"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          পণ্যের দাম ঠিক করুন
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          className="shadow-sm bg-gray-50 border text-gray-900 sm:text-sm rounded-lg w-full p-2.5 dark:bg-gray-700"
                          placeholder="দাম"
                          value={productPrice}
                          onChange={(e) => setProductPrice(e.target.value)}
                        />
                      </div>
                    )}
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

export default TodaysCalculationPage;
