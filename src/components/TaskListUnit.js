import React from "react";
import { GoTrashcan, GoVerified, GoX } from "react-icons/go";
import { useDispatch } from "react-redux";
import {changeTaskCompletition, removeList} from "../slices/taskListsSlice";
import { toggleTypes, turnOnModal } from "../slices/taskModalSlice";

const TaskListUnit = ({ id, name, tasks }) => {
  const dispatch = useDispatch();
  return (
    <div className="bg-brand-main flex flex-col rounded-xl text-white p-3 w-80 mx-4 mb-4 h-80">
      <div className="flex justify-between">
        <h3 className="text-lg font-bold text-white">{name}</h3>
        <button onClick={() => dispatch(removeList(id))}>
          <GoTrashcan />
        </button>
      </div>
      <hr className="my-2" />
      {tasks.map((task) => (
        <div className="flex text-white" key={task.id}>
          <p className={`w-10/12 ${task.isDone?"line-through text-gray-300":""}`}>{task.name}</p>
          <p className={`w-6 ${task.isDone?"line-through text-gray-300":""}`}>{task.difficulty}</p>
          <button onClick={()=>dispatch(changeTaskCompletition({listId:id,taskId:task.id}))}>
            {!task.isDone && <GoVerified />}
            {task.isDone && <GoX />}
          </button>
        </div>
      ))}
      <button
        className="bg-brand-highlight rounded-full w-10 h-10 text-3xl
    self-center mt-3 hover:bg-brand-highlight_light hover:text-brand-highlight
    ease-in-out duration-300"
        onClick={() =>
          dispatch(turnOnModal({ id, type: toggleTypes.TOGGLE_NEW_TASK }))
        }
      >
        +
      </button>
    </div>
  );
};

export default TaskListUnit;
