import React, { useState } from "react";
import { ModalBase, ModalInput } from "../index";
import { turnOffModal } from "../../slices/taskModalSlice";
import { changeTaskCompletition, editTask } from "../../slices/taskListsSlice";
import { useDispatch, useSelector } from "react-redux";
import { GoCheck, GoX } from "react-icons/go";
import { findTask } from "../../utils/finders";
import difficulties from "../../shared/difficulties";

const EditTaskModal = () => {
  const dispatch = useDispatch();
  const taskLists = useSelector((state) => state.taskLists);
  const taskModal = useSelector((state) => state.taskModal);
  const [editingName, setEditingName] = useState(false);
  const [editingDesc, setEditingDesc] = useState(false);

  const [task, setTask] = useState(
    findTask(taskLists, taskModal.togglerId, taskModal.secondaryTogglerId)
  );
  const [newName, setNewName] = useState(task.name);
  const [newDesc, setNewDesc] = useState(task.description);
  const [newDifficulty, setNewDifficulty] = useState(task.difficulty);
  return (
    <ModalBase>
      <span
        className="absolute top-2 right-2 cursor-pointer text-3xl "
        onClick={() => {
          dispatch(turnOffModal());
          setNewName("");
        }}
      >
        <GoX />
      </span>
      {!editingName && (
        <h1
          className="text-lg font-bold w-10/12 hover:bg-gray-200 cursor-pointer rounded-md p-1 ease-in-out duration-200"
          onClick={() => setEditingName(true)}
        >
          {task.name}
        </h1>
      )}
      {editingName && (
        <div className="flex mt-2 items-center flex-col items-baseline w-10/12 ">
          <ModalInput type="text" value={newName} changer={setNewName} bold />{" "}
          <div className="flex self-end mr-1 text-center p-0 text-xl -mt-0.5 z-1">
            <button
              className="bg-white flex justify-center self-end rounded-bl-xl w-12 text-red-700 border-2 hover:bg-gray-200 border-brand-light"
              onClick={() => {
                setNewName(task.name);
                setEditingName(false);
              }}
            >
              <GoX />
            </button>
            <button
              disabled={newName === ""}
              className="bg-white flex justify-center rounded-br-xl w-12 text-green-700 border-2 hover:bg-gray-200 border-brand-light"
              onClick={() => {
                setTask({ ...task, name: newName });
                dispatch(
                  editTask({
                    listId: taskModal.togglerId,
                    taskId: taskModal.secondaryTogglerId,
                    name: newName,
                  })
                );
                setEditingName(false);
              }}
            >
              <GoCheck />
            </button>
          </div>
        </div>
      )}
      <div className="w-10/12 border-t border-gray-300 mb-2" />
      <div className="flex my-2 items-center flex-col items-baseline w-10/12 ">
        {task.description && (
          <>
            <label className="font-bold">Description</label>
            {!editingDesc && (
              <p
                className="w-full rounded-md p-1 resize-none h-32 hover:bg-gray-200 cursor-pointer rounded-md p-1
                ease-in-out duration-150 whitespace-pre-line"
                onClick={() => setEditingDesc(true)}
              >
                {task.description}
              </p>
            )}
            {editingDesc && (
              <>
                <textarea
                  className="w-full border-2 rounded-md p-1 resize-none h-32 border-brand-light focus:outline-none focus:border-brand-main"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                />
                <div className="flex self-end mr-1 text-center p-0 text-xl -mt-0.5 z-1">
                  <button
                    className="bg-white flex justify-center self-end rounded-bl-xl w-12 text-red-700 border-2 hover:bg-gray-200 border-brand-light"
                    onClick={() => {
                      setNewDesc(task.description);
                      setEditingDesc(false);
                    }}
                  >
                    <GoX />
                  </button>
                  <button
                    className="bg-white flex justify-center rounded-br-xl w-12 text-green-700 border-2 hover:bg-gray-200 border-brand-light"
                    onClick={() => {
                      setTask({ ...task, description: newDesc });
                      dispatch(
                        editTask({
                          listId: taskModal.togglerId,
                          taskId: taskModal.secondaryTogglerId,
                          description: newDesc,
                        })
                      );
                      setEditingDesc(false);
                    }}
                  >
                    <GoCheck />
                  </button>
                </div>
              </>
            )}
          </>
        )}
      </div>
      <div className="flex my-2 items-center flex-col items-baseline w-10/12">
        <label className="mr-3 font-bold mb-3">Difficulty</label>
        <div className="flex w-full justify-evenly">
          {difficulties.map((difficulty) => (
            <div className="flex flex-col w-24 items-center">
              <button
                className={`${
                  difficulty.value === newDifficulty
                    ? "bg-brand-main"
                    : "bg-brand-light"
                }  hover:bg-brand-main ease-in-out duration-150 w-8 h-8 rounded-full p-1`}
                onClick={() => {
                  setNewDifficulty(difficulty.value);
                  dispatch(
                    editTask({
                      listId: taskModal.togglerId,
                      taskId: taskModal.secondaryTogglerId,
                      difficulty: difficulty.value,
                    })
                  );
                }}
              >
                <img
                  src={`/images/icons/diff-${difficulty.value}.png`}
                  className="w-6"
                  alt={difficulty.value}
                />
              </button>
              <p
                className={
                  difficulty.value === newDifficulty ? "font-bold" : ""
                }
              >
                {difficulty.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex w-6/12 justify-around text-white font-bold">
        <button
          className={`${
            task.isDone
              ? "bg-green-400 hover:bg-green-300"
              : "bg-brand-main hover:bg-brand-light"
          } rounded-xl px-6 py-2 disabled:opacity-75 disabled:text-gray
                 ease-in-out duration-150`}
          onClick={() => {
            setTask({ ...task, isDone: !task.isDone });
            dispatch(
              changeTaskCompletition({
                listId: taskModal.togglerId,
                taskId: taskModal.secondaryTogglerId,
              })
            );
          }}
        >
          {task.isDone ? "Completed" : "Complete!"}
        </button>
      </div>
    </ModalBase>
  );
};

export default EditTaskModal;
