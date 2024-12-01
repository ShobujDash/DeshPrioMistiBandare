import { useState } from "react";
import Breadcrumb from "../../components/AdminComponents/Breadcrumb";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import Toolbar from "../../components/AdminComponents/NewBreadcumb/ProductToolBar";
import Product from "../../components/AdminComponents/Product/Products";
import AddModal from "../../components/AdminComponents/Add/AddModal";

const ProductPage = () => {
  return (
    <>
      <AdminLayout>
        <Breadcrumb pageName="Product" />
        <div className="container mx-auto">
          <Toolbar pageName={"Product"} />
          <Product />
        </div>
      </AdminLayout>
    </>
  );
};

export default ProductPage;
