import React from "react";
import Button from "./Button";

const Header = () => {
  return (
    <div className="flex items-center justify-between mb-9">
      <div className="text-primary font-extrabold text-5xl hidden md:block">
        Youvatar
      </div>
      <div className="text-primary font-extrabold text-5xl md:hidden">
        <img src="/assets/hamburger.svg" alt="side-menu" />
      </div>
      <div className="flex">
        <Button
          startIcon={<img src={"/assets/preview.svg"} alt="preview" />}
          label="Preview"
          variant="outline"
          className="mr-4  md:hidden"
        />
        <Button label="Save Draft" />
      </div>
    </div>
  );
};

export default Header;
