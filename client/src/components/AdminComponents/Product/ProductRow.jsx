import Checkbox  from "./Checkbox"


const ProductRow = ({ product }) => {
  return (
    <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
      <td className="w-4 p-4">
        <Checkbox id={product.id} label="checkbox" />
      </td>
      <td className="p-4 text-sm font-normal text-gray-500 whitespace-nowrap dark:text-gray-400">
        <div className="text-base font-semibold text-gray-900 dark:text-white">
          {product.name}
        </div>
        <div className="text-sm font-normal text-gray-500 dark:text-gray-400">
          {product.category}
        </div>
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {product.technology}
      </td>
      <td className="max-w-sm p-4 overflow-hidden text-base font-normal text-gray-500 truncate xl:max-w-xs dark:text-gray-400">
        {product.description}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        #{product.id}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {product.price}
      </td>
      <td className="p-4 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white">
        {product.discount}
      </td>
      <td className="p-4 space-x-2 whitespace-nowrap">
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-blue-700 rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
          Update
        </button>
        <button
          type="button"
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:focus:ring-red-900"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          Delete item
        </button>
      </td>
    </tr>
  );
};


export default ProductRow