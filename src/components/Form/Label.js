import React from "react";

const Label = ({ className, children }) => {
  return (
    <label
      className={`block text-sm text-gray-700 dark:text-gray-400 mt-4 ${className}`}
    >
      {children}
    </label>
  );
};

export default Label;
