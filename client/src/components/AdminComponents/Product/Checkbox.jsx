const Checkbox = ({ id, label }) => {
  return (
    <div className="flex items-center">
      <input
        id={`checkbox-${id}`}
        type="checkbox"
        className="w-4 h-4 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
      />
      <label htmlFor={`checkbox-${id}`} className="sr-only">
        {label}
      </label>
    </div>
  );
};

export default Checkbox