import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import Filter from "./Filter/Filter";
import MenuContainer from "./MenuContainer";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import instance from "../../axios";

const Category = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const {data, isLoading, error} = useGetData();
  const productsPerPage = 8;

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1); // Reset to the first page on category change
  };




   const [products, setProducts] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   const getAllCategoirsData = async () => {
     setLoading(true);
     setError(null);
     try {
      const { data } = await instance.get("/api/common/getAllProducts");
       if (data?.success) {
         setProducts(data?.products || []);
       } else {
         setProducts([]);
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

  //  if (loading) return <p>Loading categories...</p>;
   if (loading) return (
     <div
       role="status"
       className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
     >
       <div className="flex items-center justify-between">
         <div>
           <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
           <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
         </div>
       </div>
       {/* <span className="sr-only">Loading...</span> */}
     </div>
   );


   if (error) return <p>{error}</p>;




  return (
    <Element className="w-full element" name="menu">
      <section>
        <MenuContainer
          onCategoryClick={handleCategoryClick}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        <div className="flex md:flex-row flex-col w-full gap-4">
          <div className="md:w-1/5 w-full">
            <Filter
              onCategoryClick={handleCategoryClick}
              selectedCategory={selectedCategory}
            />
          </div>

          <div className="md:w-4/5 w-full flex flex-col md:items-end md:justify-end  items-center justify-center gap-6">
        

            <div className="w-full flex flex-wrap md:items-start md:justify-start items-center justify-center gap-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}       
                />
              ))}
            </div>

            {/* <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            /> */}
          </div>
        </div>
      </section>
    </Element>
  );
};

export default Category;
