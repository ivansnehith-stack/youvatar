import React, { useEffect, useRef, useState } from "react";

const Dropdown = (props) => {
  const { label, options, selectedOption, onClick, placeholder } = props;
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const handleOptionClick = (option) => {
    onClick(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      {label && (
        <label className="mb-2 text-black text-sm font-normal">{label}</label>
      )}
      <div className="border border-border rounded-[10px]">
        <button
          className=" text-gray-400 font-normal py-[18px] w-full px-4 text-base flex items-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="flex w-full items-center justify-between">
            <span>{selectedOption ? selectedOption : placeholder} </span>
            <img src="/assets/cheveron.svg" alt="arrow-down" />
          </div>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg">
            {options.map((option, index) => (
              <div
                key={index}
                className="py-1 px-3 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleOptionClick(option.label)}
              >
                {option.label}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropdown;
