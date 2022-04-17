import React from "react";

const ModalBase = ({ children }) => (
  <>
    <div
      className="fixed z-10 inset-0 overflow-y-auto"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20  sm:block sm:p-0">
        <div
          className="fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
          aria-hidden="true"
        ></div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div
          className="sm:w-[480px] sm:min-w-[40vw] min-w-[80vw] w-[180px] flex flex-col items-center gap-2 justify-center
      -translate-y-1/2 p-6 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute"
        >
          {children}
        </div>
      </div>
    </div>
  </>
);

export default ModalBase;
