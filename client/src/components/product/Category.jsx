import { useEffect, useState } from "react";
import { Element } from "react-scroll";
import instance from "../../axios";
import { useAuthContext } from "../../Context/AuthContex";
import CardLoadingSkeleton from "../CardLoadingSkeleton";
import Filter from "./Filter/Filter";
import MenuContainer from "./MenuContainer";
import ProductCard from "./ProductCard";

const Category = () => {
  const { user } = useAuthContext();

  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // const {data, isLoading, error} = useGetData();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]); // Stores filtered products
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const getAllCategoirsData = async () => {
    setLoading(true);
    setError(null);
    if (!user) {
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
    } else {
      await getUserData();
    }
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      const { data } = await instance.get(`/api/user/${user?._id}`);
      if (data?.success) {
        setLoading(false);
        if (data?.user?.products.length === 0) {
           const { data } = await instance.get("/api/common/getAllProducts");
           if (data?.success) {
             setProducts(data?.products || []);
           } else {
             setProducts([]);
             setError("Failed to fetch categories.");
           }
        } else {
          setProducts(data?.user?.products);
        }
      }
    } catch (error) {
      setLoading(false);
      console.log("soemthign went wrong");
    }
  };

  // useEffect(() => {
  //   getAllCategoirsData();
  // }, []);
  useEffect(() => {
    getAllCategoirsData();
  }, [user?._id]);

  // Update filteredProducts when selectedCategory changes
  useEffect(() => {
    if (selectedCategory === "All") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter((product) => {
        if (user) {
          return (
            product?.productId?.categoryID?.categoryName === selectedCategory
          );
        } else {
          return product?.categoryID?.categoryName === selectedCategory;
        }
      });
      setFilteredProducts(filtered);
    }
  }, [selectedCategory, products]);

  //  if (loading) return <p>Loading categories...</p>;
  if (loading) return <CardLoadingSkeleton />;

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
              {filteredProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
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
