import React from "react";

const ModalInput = ({ type, value, changer, bold, maxLength, onKeyDown }) => (
  <input
    type={type}
    className={`border-2 rounded-md p-1 border-brand-light w-full focus:outline-none focus:border-brand-main
     ${bold && "font-bold"}`}
    value={value}
    onChange={(event) => changer(event.target.value)}
    maxLength={maxLength}
    onKeyDown={onKeyDown}
  />
);

export default ModalInput;
