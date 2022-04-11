import React from "react";

const ModalInput = ({ type, value, changer }) => (
  <input
    type={type}
    className="border-2 rounded-md p-1"
    value={value}
    onChange={(event) => changer(event.target.value)}
  />
);

export default ModalInput;
