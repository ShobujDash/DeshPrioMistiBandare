import { Link } from "react-router-dom";

const Breadcrumb = ({ pageName }) => {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      {/* <h2 className="font-semibold text-2xl text-blue-600 dark:text-white">
        {pageName}
      </h2> */}

      <nav
        style={{
          zIndex: -100,
        }}
        className="w-full sm:w-64"
      >
        <ol className="flex items-center gap-2">
          <li className="cursor-pointer"> 
            <Link to="/admin" className="font-bold">Dashboard /</Link>
          </li>
          <li className="text-blue-500">{pageName}</li>
        </ol>
      </nav>
    </div>
  );
};

export default Breadcrumb;
