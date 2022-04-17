import React, { useState } from "react";
import { ModalBase, ModalInput } from "../index";
import { addList } from "../../slices/taskListsSlice";
import { useDispatch } from "react-redux";
import { turnOffModal } from "../../slices/taskModalSlice";
import { GoX } from "react-icons/go";

const NewTaskListModal = () => {
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");

  function dispatchAndClose() {
    setNewName("");
    dispatch(addList(newName));
    dispatch(turnOffModal());
  }

  return (
    <ModalBase>
      <span
        className="absolute top-2 right-2 cursor-pointer text-3xl"
        onClick={() => {
          dispatch(turnOffModal());
          setNewName("");
        }}
      >
        <GoX />
      </span>
      <h1 className="text-lg font-bold">Add a new task group</h1>
      <div className="w-10/12 border-t border-gray-300 mb-2" />
      <div className="flex my-2 items-center flex-col items-baseline w-full sm:w-10/12 ">
        <label className="font-bold">Name</label>
        <ModalInput
          type="text"
          maxLength="40"
          value={newName}
          changer={setNewName}
          onKeyDown={(e) =>
            e.code === "Enter" && newName.length > 0 && dispatchAndClose()
          }
        />
      </div>
      <div className="flex w-6/12 justify-around text-white font-bold">
        <button
          disabled={newName === ""}
          className="bg-brand-main rounded-xl px-6 py-2 disabled:opacity-75 disabled:text-gray
                hover:bg-brand-light ease-in-out duration-150"
          onClick={() => dispatchAndClose()}
        >
          Create
        </button>
      </div>
    </ModalBase>
  );
};

export default NewTaskListModal;
