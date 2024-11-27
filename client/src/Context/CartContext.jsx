import { createContext, useContext, useState } from "react";
import { CgGlass } from "react-icons/cg";

const CartContext = createContext(null);

const CartContextProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartVisible, setIsCartVisible] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

  // Function to calculate the total price
  const calculateTotalPrice = (cart) => {
    return cart.reduce((acc, item) => acc + item.price * item.qnty, 0);
  };

  // Add an item to the cart
  const addToCart = (newItem) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === newItem.id);
      let updatedCart;

      if (itemIndex >= 0) {
        // If the item exists, increase its quantity
        updatedCart = prevCart.map((item, index) =>
          index === itemIndex ? { ...item, qnty: item.qnty + 1 } : item
        );
      } else {
        // If the item doesn't exist, add it
        updatedCart = [...prevCart, { ...newItem, qnty: 1 }];
      }

      setTotalPrice(calculateTotalPrice(updatedCart));
      return updatedCart;
    });
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter((item) => item.id !== itemId);
      setTotalPrice(calculateTotalPrice(updatedCart));
      return updatedCart;
    });
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    setTotalPrice(0);
  };

  // Decrease the quantity of an item in the cart
  const decrementItem = (itemId) => {
    setCart((prevCart) => {
      const itemIndex = prevCart.findIndex((item) => item.id === itemId);
      let updatedCart;

      if (prevCart[itemIndex].qnty > 1) {
        updatedCart = prevCart.map((item, index) =>
          index === itemIndex ? { ...item, qnty: item.qnty - 1 } : item
        );
      } else {
        // If quantity is 1, remove the item from the cart
        updatedCart = prevCart.filter((item) => item.id !== itemId);
      }

      setTotalPrice(calculateTotalPrice(updatedCart));
      return updatedCart;
    });
  };

  // Toggle cart visibility
  const toggleCartVisibility = () => {
    setIsCartVisible((prev) => !prev);
  };

  // Provide the cart-related state and actions
  const Cart = {
    cart,
    isCartVisible,
    totalPrice,
    addToCart,
    removeFromCart,
    clearCart,
    decrementItem,
    toggleCartVisibility,
  };

  return <CartContext.Provider value={Cart}>{children}</CartContext.Provider>;
};

// Custom hook to use the Cart context
const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartContextProvider");
  }
  return context;
};

// Export the provider and custom hook
export { CartContextProvider, useCartContext };
