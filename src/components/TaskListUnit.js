import React from "react";
import { GoTrashcan, GoPlus } from "react-icons/go";
import { useDispatch } from "react-redux";
import { removeList } from "../slices/taskListsSlice";
import { toggleTypes, turnOnModal } from "../slices/taskModalSlice";

const TaskListUnit = ({ id, name, tasks }) => {
  const dispatch = useDispatch();
  return (
    <div
      className="bg-brand-main flex flex-col rounded-xl text-white w-80 mx-4 mb-4 h-80
    shadow-[0_15px_60px_-15px_rgba(0,0,0,0.3)]"
    >
      <div className="flex justify-between items-start px-6 py-2 mt-1">
        <h3 className="text-lg font-bold text-white w-10/12 break-all">
          {name}
        </h3>
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
          onClick={() =>
            dispatch(
              turnOnModal({
                id,
                secondaryId: task.id,
                type: toggleTypes.TOGGLE_EDIT_TASK,
              })
            )
          }
        >
          <p
            className={`overflow-hidden w-10/12  ${
              task.isDone ? "line-through text-gray-300" : ""
            }`}
          >
            {task.name.length > 25
              ? task.name.substring(0, 25) + "..."
              : task.name}
          </p>
          <p
            className={`w-6 bg-brand-dark text-center rounded-xl ${
              task.isDone ? "bg-gray-400" : ""
            }`}
          >
            <img
              src={`/images/icons/diff-${task.difficulty}.png`}
              className="w-6"
              alt={task.difficulty}
            />
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
