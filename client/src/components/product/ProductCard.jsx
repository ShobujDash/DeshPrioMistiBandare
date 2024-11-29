import React from 'react';
import { motion } from 'framer-motion';
import { MdShoppingBasket } from 'react-icons/md';
import { useCartContext } from '../../Context/CartContext';
import { useNavigate } from 'react-router-dom';


const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();
  const navigate = useNavigate()

  const handleAdd = (e) => {
    e.stopPropagation(); // Prevent triggering the navigation when clicking "Add to Cart"
    addToCart(product);
  };

  return (
    <div
      className="w-[260px] h-[270px] flex flex-col bg-card hover:bg-white items-center justify-center gap-4 rounded-xl border border-gray-200 transition-transform duration-500 cursor-pointer"
      // onClick={onClick} // Add navigation functionality
      onClick={() => navigate("/product/details")}
    >
      <div className="w-full h-full flex flex-col items-center justify-between py-4">
        <motion.img
          whileHover={{ scale: 1.2 }}
          src={product.photo}
          alt={product.name}
          className="w-[130px] h-[130px] max-w-[120px] drop-shadow-2xl"
        />
        <div className="w-full flex flex-col items-center justify-center px-4">
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-semibold">{product.name}</h2>
            <p className="text-gray-600 mb-4">{product.description}</p>
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <p className="text-3xl text-headingColor font-semibold">
              <span className="text-red-500">$</span>
              {product.price}
            </p>
            <button
              onClick={handleAdd}
              className="group relative bg-red-500 text-white py-2 px-4 rounded"
            >
              <MdShoppingBasket
                size={"20"}
                className="text-white absolute top-[9px] left-[45px] invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              />
              <span className="group-hover:invisible">Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
