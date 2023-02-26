import React, { useState } from "react";
import clsxm from "../lib/clsxm";

const TextInput = ({
  placeholder,
  inputClassName,
  wrapperClassName,
  disabled,
  label,
  name,
  error,
  helperText,
  variant,
  startIcon,
  endIcon,
  onFocus,
  onBlur,
  onChange,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleOnFocus = (e) => {
    setIsFocused(true);

    onFocus?.(e);
  };

  const handleOnBlur = (e) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const handleChange = (e) => {
    setIsFocused(false);
    onChange?.(e);
  };

  return (
    <div className={clsxm("flex  flex-col items-start", wrapperClassName)}>
      {label && (
        <label htmlFor={name} className="mb-1.5 text-black text-sm font-normal">
          {label}
        </label>
      )}
      <div
        className={clsxm(
          "inline-flex w-full whitespace-nowrap rounded-[10px] transition-colors duration-75",
          "border border-solid border-border",
          "hover:border-primary hover:bg-dark-grey-500",
          isFocused && "border-primary bg-dark-grey-500"
        )}
      >
        {startIcon && (
          <div
            className={clsxm(
              "ml-2 flex items-center whitespace-nowrap text-gray-600",
              isFocused && "text-white"
            )}
          >
            {startIcon}
          </div>
        )}
        {variant === "textarea" ? (
          <>
            <textarea
              name={name}
              placeholder={placeholder}
              disabled={disabled}
              className={clsxm(
                "peer w-full py-[18px] h-[133px] px-4 shadow-none text-black",
                "border-0 bg-transparent text-base  placeholder-text-gray-400",
                "focus:text-black focus:outline-none focus:ring-transparent focus:placeholder:text-gray-400",
                "active:text-black active:placeholder:text-gray-400",
                inputClassName
              )}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={handleChange}
              {...rest}
            />
          </>
        ) : (
          <>
            <input
              name={name}
              disabled={disabled}
              placeholder={placeholder}
              className={clsxm(
                "peer w-full py-[18px] px-4 shadow-none text-black",
                "border-0 bg-transparent text-base  placeholder-text-gray-400",
                "focus:text-black focus:outline-none focus:ring-transparent focus:placeholder:text-gray-400",
                "active:text-black active:placeholder:text-gray-400",
                inputClassName
              )}
              onFocus={handleOnFocus}
              onBlur={handleOnBlur}
              onChange={onChange}
              {...rest}
            />
          </>
        )}
        {endIcon && (
          <div
            className={clsxm(
              "mr-3 flex items-center whitespace-nowrap text-gray-600",
              isFocused && "text-white"
            )}
          >
            {endIcon}
          </div>
        )}
      </div>
      {error && <p className="text-2xs leading-5 text-error">{error}</p>}
    </div>
  );
};

export default TextInput;
