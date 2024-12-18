import React, { useEffect, useState } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import instance from '../../../axios';


const CategoryList = ({ onCategoryClick, selectedCategory }) => {
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

  return (
    <div className="w-full flex flex-col items-start gap-2  overflow-x-scroll scrollbar-none">
      <h2 className="text-[18px] ">Category</h2>
      <div className="relative w-full ">
       
        <select
          onChange={(e) => onCategoryClick(e.target.value)}
          value={selectedCategory}
          className="px-8 py-2 cursor-pointer outline-none  w-full"
        >
          <option value="All">All</option>
          {categories &&
            categories.map((category) => (
              <option
                className='text-gray-900 hover:text-gray-300'
                key={category?._id} value={category?.categoryName}>
                {category.name}
              </option>
            ))}
        </select>
        <div className="absolute inset-y-0 left-0 flex items-center px-2 pointer-events-none">
          <IoIosArrowDown className="text-textColor text-[20px]" />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
