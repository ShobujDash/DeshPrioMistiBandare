import CategoryModal from "./CategoryModal";
import ProductModal from "./ProductModal";

const AddModal = ({ isOpen, onClose, pageName }) => {
  if (pageName === "Categroy") {
    return (
      <CategoryModal pageName={pageName} onClose={onClose} isOpen={isOpen} />
    );
  }

  if (pageName === "Product") {
    return (
      <ProductModal pageName={pageName} onClose={onClose} isOpen={isOpen} />
    );
  }

  return null;
};

export default AddModal;
