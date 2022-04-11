import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addList, addTaskToList } from "../slices/taskListsSlice";
import { Navbar, Footer, Modal, TaskListUnit } from "../components";
import { GoPlus } from "react-icons/go";
import { toggleTaskModal } from "../slices/taskModalSlice";

function App() {
  const [showModal, setModal] = useState(false);
  const taskLists = useSelector((state) => state.taskLists) || [];
  const taskModal = useSelector((state) => state.taskModal);
  const dispatch = useDispatch();
  const [newName, setNewName] = useState("");
  const [newDifficulty, setNewDifficulty] = useState(1);

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <button
            className="bg-brand-highlight w-64 self-center mt-5 text-white font-bold
            rounded-2xl hover:bg-brand-highlight_light hover:text-brand-highlight
             px-3 py-1 ease-in-out duration-150"
            onClick={() => setModal(!showModal)}
          >
            <div className="flex items-center justify-around">
              Add a new task group
              <div className="text-4xl rounded-full ml-2">
                <GoPlus />
              </div>
            </div>
          </button>
          <div className="flex p-4 flex-wrap">
            {taskLists.map((list) => (
              <TaskListUnit
                key={list.id}
                name={list.name}
                id={list.id}
                tasks={list.tasks}
              />
            ))}
          </div>
        </div>

        {/*MODAL*/}
        {showModal && (
          <Modal visibFunc={setModal}>
            <h1 className="text-lg font-bold">Add a new task group</h1>
            <div className="w-10/12 border-t border-gray-300 mb-2" />
            <div className="flex my-2 items-center">
              <label className="mr-3">Name:</label>
              <input
                type="text"
                className="border-2 rounded-md p-1"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />{" "}
            </div>
            <div className="flex w-6/12 justify-around text-white font-bold">
              <button
                className="bg-red-700 w-20 rounded-xl p-2
                hover:bg-red-500 ease-in-out duration-150"
                onClick={() => {
                  setModal(false);
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
                  setModal(false);
                }}
              >
                Create
              </button>
            </div>
          </Modal>
        )}

        {taskModal && taskModal.isToggled && (
          <Modal>
            <h1 className="text-lg font-bold">Add a new task</h1>
            <div className="w-10/12 border-t border-gray-300 mb-2" />
            <div className="flex my-2 items-center">
              <label className="mr-3">Name:</label>
              <input
                type="text"
                className="border-2 rounded-md p-1"
                value={newName}
                onChange={(event) => setNewName(event.target.value)}
              />
            </div>
            <div className="flex my-2 items-center">
              <label className="mr-3">Difficulty:</label>
              <input
                type="number"
                min={1}
                max={3}
                className="border-2 rounded-md p-1"
                value={newDifficulty}
                onChange={(event) =>
                  setNewDifficulty(parseInt(event.target.value))
                }
              />
            </div>
            <div className="flex w-6/12 justify-around text-white font-bold">
              <button
                className="bg-red-700 w-20 rounded-xl p-2
                hover:bg-red-500 ease-in-out duration-150"
                onClick={() => {
                  dispatch(toggleTaskModal(-1));
                  setNewDifficulty(1);
                  setNewName("");
                }}
              >
                Exit
              </button>
              <button
                className="bg-brand-main w-20 rounded-xl p-2 disabled:opacity-75 disabled:text-gray
                hover:bg-brand-light ease-in-out duration-150"
                onClick={() => {
                  dispatch(
                    addTaskToList({
                      taskId: taskModal.togglerId,
                      name: newName,
                      difficulty: newDifficulty,
                    })
                  );
                  dispatch(toggleTaskModal());
                  setNewDifficulty(1);
                  setNewName("");
                }}
              >
                Create
              </button>
            </div>
          </Modal>
        )}

        <Footer />
      </div>
    </>
  );
}
export default App;
