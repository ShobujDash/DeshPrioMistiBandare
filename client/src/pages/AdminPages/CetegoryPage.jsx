
import { useState } from "react";
import Breadcrumb from "../../components/AdminComponents/Breadcrumb";
import AdminLayout from "../../components/AdminComponents/Layout/AdminLayout";
import Toolbar from "../../components/AdminComponents/NewBreadcumb/ProductToolBar";
import Product from "../../components/AdminComponents/Product/Products";

const CategoryPage = () => {
 
  return (
    <>
      <AdminLayout>
        <Breadcrumb pageName="Category" />
        <div className="container mx-auto">
          <Toolbar pageName={"Categroy"}  />
          <Product />
        </div>
      </AdminLayout>
    </>
  );
};

export default CategoryPage;
