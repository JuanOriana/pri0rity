import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Footer, TaskListUnit } from "../components";
import { GoPlus } from "react-icons/go";
import { toggleTypes, turnOnModal } from "../slices/taskModalSlice";
import NewTaskListModal from "../components/Modal/NewTaskListModal";
import NewTaskModal from "../components/Modal/NewTaskModal";

function App() {
  const taskLists = useSelector((state) => state.taskLists) || [];
  const taskModal = useSelector((state) => state.taskModal);
  const dispatch = useDispatch();

  const renderProperModal = (toggleType) => {
    switch (toggleType) {
      case toggleTypes.TOGGLE_NEW_LIST:
        return <NewTaskListModal />;
      case toggleTypes.TOGGLE_NEW_TASK:
        return <NewTaskModal />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <button
            className="bg-brand-highlight w-64 self-center mt-8 mb-3 text-white font-bold
            rounded-2xl hover:bg-brand-highlight_light hover:text-brand-highlight
             px-3 py-1 ease-in-out duration-150"
            onClick={() =>
              dispatch(turnOnModal({ type: toggleTypes.TOGGLE_NEW_LIST }))
            }
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
          {taskLists.length === 0 && (
            <h2 className="self-center text-2xl font-bold text-brand-main text-center p-3 pt-10 ">
              You don't have any task groups, add one to start optimizing! 👨🏻‍💻️
            </h2>
          )}
        </div>

        {taskModal &&
          taskModal.isToggled &&
          renderProperModal(taskModal.toggleType)}

        <Footer />
      </div>
    </>
  );
}
export default App;
