
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import instance from "../../axios";

const MenuList = ({ onCategoryClick, selectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllCategoirsData = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await instance.get("/api/common/getAllCategory");
      if (data?.success) {
        setCategories(data.categories || []);
      } else {
        setCategories([]);
        setError("Failed to fetch categories.");
      }
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching categories.");
    } finally {
      setLoading(false);
    }
  };



  useEffect(() => {
    getAllCategoirsData();
  }, []);

  if (loading) return <p>Loading categories...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="w-full flex items-center gap-4 md:py-8 py-6 overflow-x-scroll scrollbar-none">
      <motion.div
        whileTap={{ scale: 0.88 }}
        className={`group ${
          selectedCategory === "All"
            ? "bg-cartNumBg"
            : "bg-card"
        } cursor-pointer rounded-md border border-gray-200 flex flex-col gap-2 items-center justify-center hover:bg-cartNumBg`}
        onClick={() => onCategoryClick("All")}
      >
        <p
          className={`text-sm font-medium w-[84px] text-center md:py-[9px] py-[7px] ${
            selectedCategory === "All"
              ? "text-blue-700 bg-lime-200"
              : "text-textColor"
          } group-hover:text-red-400`}
        >
          All
        </p>
      </motion.div>
      {categories?.length > 0 ? (
        categories.map((category) => (
          <motion.div
            whileTap={{ scale: 0.88 }}
            key={category?._id} // Ensure the key is unique
            className={`group ${
              selectedCategory === category?.categoryName
                ? "bg-cartNumBg"
                : "bg-card"
            } cursor-pointer rounded-md border border-gray-200 flex flex-col gap-2 items-center justify-center hover:bg-cartNumBg`}
            onClick={() => onCategoryClick(category.categoryName)}
          >
            <p
              className={`text-sm font-medium w-[84px] text-center md:py-[9px] py-[7px] ${
                selectedCategory === category?.categoryName
                  ? "text-blue-700 bg-lime-200"
                  : "text-textColor"
              } group-hover:text-red-400`}
            >
              {category?.categoryName}
            </p>
          </motion.div>
        ))
      ) : (
        <p>No categories available.</p>
      )}
    </div>
  );
};

export default MenuList;
