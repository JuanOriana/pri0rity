import React, { useState } from "react";
import { ModalBase, ModalInput } from "../index";
import { addList } from "../../slices/taskListsSlice";
import { useDispatch } from "react-redux";
import { turnOffModal } from "../../slices/taskModalSlice";

const NewTaskListModal = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  return (
    <ModalBase>
      <h1 className="text-lg font-bold">Add a new task group</h1>
      <div className="w-10/12 border-t border-gray-300 mb-2" />
      <div className="flex my-2 items-center">
        <label className="mr-3">Name:</label>
        <ModalInput type="text" value={newName} changer={setNewName} />
      </div>
      <div className="flex w-6/12 justify-around text-white font-bold">
        <button
          className="bg-red-700 w-20 rounded-xl p-2
                hover:bg-red-500 ease-in-out duration-150"
          onClick={() => {
            dispatch(turnOffModal());
            setNewName("");
          }}
        >
          Exit
        </button>
        <button
          disabled={newName === ""}
          className="bg-brand-main w-20 rounded-xl p-2 disabled:opacity-75 disabled:text-gray
                hover:bg-brand-light ease-in-out duration-150"
          onClick={() => {
            setNewName("");
            dispatch(addList(newName));
            dispatch(turnOffModal());
          }}
        >
          Create
        </button>
      </div>
    </ModalBase>
  );
};

export default NewTaskListModal;
