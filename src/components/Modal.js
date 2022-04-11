import React from "react";

const Modal = ({ children }) => (
  <>
    <div className="w-full h-full bg-black opacity-50 top-0 absolute" />
    <div
      className="sm:w-[385px] sm:min-w-[40vw] min-w-[80vw]  flex flex-col items-center gap-2
      -translate-y-1/2 p-6 bg-white rounded-lg top-1/2 left-1/2 -translate-x-1/2 absolute"
    >
      {children}
    </div>
  </>
);

export default Modal;
