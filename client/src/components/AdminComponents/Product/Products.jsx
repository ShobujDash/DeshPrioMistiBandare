import React from "react";
import ProductTable from "./ProductTable";


const products = [
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    technology: "Tech X",
    description: "This is a description for Product 1.",
    price: "$20",
    discount: "10%",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    technology: "Tech Y",
    description: "This is a description for Product 2.",
    price: "$30",
    discount: "15%",
  },
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    technology: "Tech X",
    description: "This is a description for Product 1.",
    price: "$20",
    discount: "10%",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    technology: "Tech Y",
    description: "This is a description for Product 2.",
    price: "$30",
    discount: "15%",
  },
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    technology: "Tech X",
    description: "This is a description for Product 1.",
    price: "$20",
    discount: "10%",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    technology: "Tech Y",
    description: "This is a description for Product 2.",
    price: "$30",
    discount: "15%",
  },
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    technology: "Tech X",
    description: "This is a description for Product 1.",
    price: "$20",
    discount: "10%",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    technology: "Tech Y",
    description: "This is a description for Product 2.",
    price: "$30",
    discount: "15%",
  },
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    technology: "Tech X",
    description: "This is a description for Product 1.",
    price: "$20",
    discount: "10%",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    technology: "Tech Y",
    description: "This is a description for Product 2.",
    price: "$30",
    discount: "15%",
  },
  {
    id: 1,
    name: "Product 1",
    category: "Category A",
    technology: "Tech X",
    description: "This is a description for Product 1.",
    price: "$20",
    discount: "10%",
  },
  {
    id: 2,
    name: "Product 2",
    category: "Category B",
    technology: "Tech Y",
    description: "This is a description for Product 2.",
    price: "$30",
    discount: "15%",
  },
  // More products...
];

const Product = () => {
  return (
    <div className="container rounded-sm mx-auto overflow-y-scroll">
      <ProductTable products={products} />
    </div>
  );
};

export default Product;
