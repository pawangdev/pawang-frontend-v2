import React from "react";
import { Link } from "react-router-dom";

const Button = ({
  children,
  type = "button",
  link = "/",
  onClick,
  className = null,
}) => {
  return type === "button" ? (
    <button
      onClick={onClick}
      className={`px-3 py-2 mt-4 ${
        className == null
          ? "bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          : className
      }`}
    >
      {children}
    </button>
  ) : (
    <Link
      to={link}
      className={`px-3 py-2 mt-4 ${
        className == null
          ? "bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
          : className
      }`}
    >
      {children}
    </Link>
  );
};

export default Button;
