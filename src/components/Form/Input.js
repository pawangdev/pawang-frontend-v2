import React from "react";

export const Input = ({ className, ...props }) => {
  return (
    <input
      className={`${className} w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      {...props}
    />
  );
};

export const Select = ({ children, className, ...props }) => {
  return (
    <select
      className={`${className} w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      {...props}
    >
      {children}
    </select>
  );
};

export const TextArea = ({ className, ...props }) => {
  return (
    <textarea
      className={`${className} w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
      {...props}
    />
  );
};
