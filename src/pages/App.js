import React, { useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navbar, Footer, TaskListUnit } from "../components";
import { GoPlus } from "react-icons/go";
import { toggleTypes, turnOnModal } from "../slices/taskModalSlice";
import NewTaskListModal from "../components/Modal/NewTaskListModal";
import NewTaskModal from "../components/Modal/NewTaskModal";
import EditTaskModal from "../components/Modal/EditTaskModal";
import { findOptimalTask } from "../utils/finders";

function App() {
  const taskLists = useSelector((state) => state.taskLists) || [];
  const taskModal = useSelector((state) => state.taskModal);
  const dispatch = useDispatch();
  const optimalTask = useMemo(() => findOptimalTask(taskLists), [taskLists]);
  const renderProperModal = (toggleType) => {
    switch (toggleType) {
      case toggleTypes.TOGGLE_NEW_LIST:
        return <NewTaskListModal />;
      case toggleTypes.TOGGLE_NEW_TASK:
        return <NewTaskModal />;
      case toggleTypes.TOGGLE_EDIT_TASK:
        return <EditTaskModal />;
      default:
        return <></>;
    }
  };
  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex flex-col flex-1">
          <div className="flex w-full justify-evenly w-9/12 self-center items-center ">
            {taskLists.length > 0 && optimalTask && (
              <div className="flex">
                <p
                  className="bg-brand-main w-80 self-center mb-3 text-white p-4
            rounded-2xl rounded-br-sm text-center -mt-8"
                >
                  You should probably be working on that{" "}
                  <b>{optimalTask.name} </b>
                  activity in your{" "}
                  <b className="text-orange-400">{optimalTask.listName}</b>{" "}
                  group!
                </p>
                <img
                  src="/images/lil_guy.svg"
                  className="w-64 mt-12"
                  alt="guy"
                />
              </div>
            )}
            <button
              className={`flex bg-brand-dark w-64 self-center ${
                taskLists > 0 ? "mt-8 mb-3" : "mt-14 -mb-4"
              } mb-3 text-white font-bold
            rounded-2xl hover:bg-brand-light items-center justify-center
             px-3 py-1 ease-in-out duration-150`}
              onClick={() =>
                dispatch(turnOnModal({ type: toggleTypes.TOGGLE_NEW_LIST }))
              }
            >
              <div className="flex flex-col items-center justify-center text-xl w-21">
                Add a new task group
                <div className="text-4xl rounded-full">
                  <GoPlus />
                </div>
              </div>
            </button>
          </div>
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
