import React from "react";
import clsxm from "../lib/clsxm";

const Button = (props) => {
  const { label, variant = "primary", startIcon, className, onClick } = props;
  return (
    <button
      className={clsxm(
        "flex items-center justify-center font-semibold py-3 px-5 rounded",
        [
          variant === "primary" && ["bg-primary  text-white"],
          variant === "outline" && [
            "bg-white border border-primary text-primary",
          ],
          variant === "link" && ["bg-transparent text-primary"],
        ],
        className
      )}
      onClick={onClick}
    >
      {startIcon && (
        <span role="img" className="mr-2.5">
          {startIcon}
        </span>
      )}
      {label}
    </button>
  );
};

export default Button;
