import React from "react";
import clsxm from "../lib/clsxm";

const Button = (props) => {
  const {
    label,
    variant = "primary",
    startIcon,
    className,
    onClick,
    disabled,
  } = props;
  return (
    <button
      disabled={disabled}
      className={clsxm(
        "flex items-center justify-center font-semibold py-3 px-5 rounded",
        [
          variant === "primary" && [
            "bg-primary text-white",
            "disabled:opacity-50 disabled:hover:border-primary disabled:hover:bg-secondary disabled:hover:text-dark-grey-700",
            "disabled:cursor-not-allowed",
          ],

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
