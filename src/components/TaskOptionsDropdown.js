import React, { useState } from "react";
import { GoKebabVertical } from "react-icons/go";

const TaskOptionsDropdown = () => {
  const [isCollapsed, setCollapsed] = useState(true);

  return (
    <div onBlur={() => setCollapsed(true)} onFocus={() => setCollapsed(false)}>
      <button
        className="text-white focus:outline-none  font-medium text-sm text-center inline-flex items-center"
        type="button"
      >
        <GoKebabVertical />
      </button>
      {!isCollapsed && (
        <div className="absolute z-10 w-44 rounded divide-y divide-gray-100 shadow bg-gray-700">
          <ul className="py-1 text-sm text-gray-700 dark:text-gray-200">
            <li className="block py-2 px-4 hover:bg-gray-600 hover:text-white cursor-pointer">
              Edit
            </li>
            <li className="block py-2 px-4 hover:bg-gray-600 hover:text-red-300 text-red-500 cursor-pointer">
              Remove
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default TaskOptionsDropdown;
