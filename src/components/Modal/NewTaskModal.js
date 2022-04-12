import React, { useState } from "react";
import { ModalBase, ModalInput } from "../index";
import { turnOffModal } from "../../slices/taskModalSlice";
import { addTaskToList } from "../../slices/taskListsSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoX } from "react-icons/go";

const NewTaskModal = () => {
  const dispatch = useDispatch();
  const taskModal = useSelector((state) => state.taskModal);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDifficulty, setNewDifficulty] = useState(1);

  return (
    <ModalBase>
      <span
        className="absolute top-2 right-2 cursor-pointer text-3xl"
        onClick={() => {
          dispatch(turnOffModal());
          setNewName("");
          setNewDesc("");
        }}
      >
        <GoX />
      </span>
      <h1 className="text-lg font-bold">Add a new task</h1>
      <div className="w-10/12 border-t border-gray-300 mb-2" />
      <div className="flex my-2 items-center flex-col items-baseline w-10/12 ">
        <label className="font-bold">Name</label>
        <ModalInput type="text" value={newName} changer={setNewName} />
      </div>
      <div className="flex my-2 items-center flex-col items-baseline w-10/12 ">
        <label className="font-bold">Description:</label>
        <textarea
          className="w-full border-2 border-brand-light rounded-md p-1 resize-none h-32 focus:outline-none focus:border-brand-main"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
      </div>
      <div className="flex my-2 items-center ">
        <label className="mr-3 font-bold">Difficulty</label>
        <input
          type="number"
          min={1}
          max={3}
          className="border-brand-light border-2 rounded-md p-1 focus:outline-none focus:border-brand-main"
          value={newDifficulty}
          onChange={(event) => setNewDifficulty(parseInt(event.target.value))}
        />
      </div>
      <div className="flex w-6/12 justify-around text-white font-bold">
        <button
          disabled={newName === "" || newDifficulty < 1 || newDifficulty > 3}
          className="bg-brand-main rounded-xl px-6 py-2 disabled:opacity-75 disabled:text-gray
                hover:bg-brand-light ease-in-out duration-150"
          onClick={() => {
            dispatch(
              addTaskToList({
                taskId: taskModal.togglerId,
                name: newName,
                difficulty: newDifficulty,
                description: newDesc,
              })
            );
            dispatch(turnOffModal());
            setNewDifficulty(1);
            setNewName("");
            setNewDesc("");
          }}
        >
          Create
        </button>
      </div>
    </ModalBase>
  );
};

export default NewTaskModal;
