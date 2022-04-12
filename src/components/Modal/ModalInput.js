import React from "react";

const ModalInput = ({ type, value, changer, bold }) => (
  <input
    type={type}
    className={`border-2 rounded-md p-1 border-brand-main w-full ${
      bold && "font-bold"
    }`}
    value={value}
    onChange={(event) => changer(event.target.value)}
  />
);

export default ModalInput;
