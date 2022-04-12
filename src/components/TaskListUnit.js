import React from "react";
import { GoTrashcan, GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import { removeList } from "../slices/taskListsSlice";
import { toggleTypes, turnOnModal } from "../slices/taskModalSlice";

const TaskListUnit = ({ id, name, tasks }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-brand-main flex flex-col rounded-xl text-white w-80 mx-4 mb-4 h-80 shadow-lg">
      <div className="flex justify-between px-6 py-2">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <button onClick={() => dispatch(removeList(id))}>
          <GoTrashcan />
        </button>
      </div>
      <hr className="mb-2 w-10/12 self-center" />
      {tasks.map((task) => (
        <div
          className="flex text-white hover:bg-brand-light rounded-sm px-4 cursor-pointer
          ease-in-out duration-200 justify-between text-md py-0.5"
          key={task.id}
        >
          <p className={` ${task.isDone ? "line-through text-gray-300" : ""}`}>
            {task.name}
          </p>
          <p
            className={`w-6 bg-brand-dark text-center rounded-xl ${
              task.isDone ? "line-through text-gray-300" : ""
            }`}
          >
            {task.difficulty}
          </p>
        </div>
      ))}
      <div
        className="bg-brand-dark mt-2 px-4 text-md w-11/12 cursor-pointer hover:bg-brand-light
             ease-in-out duration-300 font-bold flex items-center rounded-r-xl"
        onClick={() =>
          dispatch(turnOnModal({ id, type: toggleTypes.TOGGLE_NEW_TASK }))
        }
      >
        <span className="pr-1 text-xl">
          <GoPlus />
        </span>
        Add new task
      </div>
    </div>
  );
};

export default TaskListUnit;
