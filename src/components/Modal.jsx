import React, { useEffect, useRef } from "react";
import clsxm from "../lib/clsxm";
import Portal from "./Portal";

const Modal = ({ onClose, onTerminate, children, title }) => {
  const modalWrapperRef = useRef();

  useEffect(() => {
    // check if the user has clickedinside or outside the modal
    const backDropHandler = (e) => {
      if (!modalWrapperRef?.current?.contains(e.target)) {
        onClose();
      }
    };

    // attach event listener to the whole windor with our handler
    document.addEventListener("click", backDropHandler);

    // remove the event listener when the modal is closed
    return () => document.removeEventListener("click", backDropHandler);
  }, [onClose]);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
    onTerminate && onTerminate();
  };

  const modalContent = (
    // Overlay
    <div
      className={clsxm(
        "fixed inset-0 z-50 h-screen w-full bg-secondary bg-opacity-50",
        "flex items-center justify-center text-center"
      )}
    >
      {/* ModalWrapper */}
      <div
        ref={modalWrapperRef}
        className="absolute m-5 mix-blend-hard-light  bg-white  sm:min-h-[24rem] sm:min-w-[32rem] "
      >
        {/* Modal */}
        <div className="rounded-md bg-dark-grey-300 p-4">
          {/* ModalHeader */}
          <div className="flex justify-end cursor-pointer">
            <img
              src="/assets/close.svg"
              alt="close"
              onClick={handleCloseClick}
            />
          </div>

          {title && <h2 className="mb-4 text-secondary">{title}</h2>}

          {/* ModalBody */}
          <div>{children}</div>
        </div>
      </div>
    </div>
  );

  return <Portal>{modalContent}</Portal>;
};

export default Modal;
