import React, { useState } from "react";
import { ModalBase, ModalInput } from "../index";
import { turnOffModal } from "../../slices/taskModalSlice";
import { addTaskToList } from "../../slices/taskListsSlice";
import { useDispatch, useSelector } from "react-redux";

const NewTaskModal = () => {
  const dispatch = useDispatch();
  const taskModal = useSelector((state) => state.taskModal);
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDifficulty, setNewDifficulty] = useState(1);

  return (
    <ModalBase>
      <h1 className="text-lg font-bold">Add a new task</h1>
      <div className="w-10/12 border-t border-gray-300 mb-2" />
      <div className="flex my-2 items-center flex-col items-baseline w-10/12 ">
        <label className="font-bold">Name</label>
        <ModalInput type="text" value={newName} changer={setNewName} />
      </div>
      <div className="flex my-2 items-center flex-col items-baseline w-10/12 ">
        <label className="font-bold">Description:</label>
        <textarea
          className="w-full border-2 rounded-md p-1 resize-none h-32"
          value={newDesc}
          onChange={(e) => setNewDesc(e.target.value)}
        />
      </div>
      <div className="flex my-2 items-center ">
        <label className="mr-3 font-bold">Difficulty -></label>
        <input
          type="number"
          min={1}
          max={3}
          className="border-2 rounded-md p-1"
          value={newDifficulty}
          onChange={(event) => setNewDifficulty(parseInt(event.target.value))}
        />
      </div>
      <div className="flex w-6/12 justify-around text-white font-bold">
        <button
          className="bg-red-700 w-20 rounded-xl p-2
                hover:bg-red-500 ease-in-out duration-150"
          onClick={() => {
            dispatch(turnOffModal());
            setNewDifficulty(1);
            setNewName("");
          }}
        >
          Exit
        </button>
        <button
          disabled={newName === "" || newDifficulty < 1 || newDifficulty > 3}
          className="bg-brand-main w-20 rounded-xl p-2 disabled:opacity-75 disabled:text-gray
                hover:bg-brand-light ease-in-out duration-150"
          onClick={() => {
            dispatch(
              addTaskToList({
                taskId: taskModal.togglerId,
                name: newName,
                difficulty: newDifficulty,
                descripton: newDesc,
              })
            );
            dispatch(turnOffModal());
            setNewDifficulty(1);
            setNewName("");
          }}
        >
          Create
        </button>
      </div>
    </ModalBase>
  );
};

export default NewTaskModal;
