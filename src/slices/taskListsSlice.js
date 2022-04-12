import { createSlice, nanoid } from "@reduxjs/toolkit";

function findIndexPair(state, listId, taskId) {
  const listIdx = state.findIndex((list) => list.id === listId);
  if (listIdx < 0) return [-1, -1];
  const taskIdx = state[listIdx].tasks.findIndex((task) => task.id === taskId);
  return [listIdx, taskIdx];
}
const taskListsSlice = createSlice({
  name: "taskLists",
  initialState: [],
  reducers: {
    addList: {
      reducer: (state, action) => {
        state.push(action.payload);
      },
      prepare: (name) => {
        const id = nanoid();
        return { payload: { id, name, tasks: [] } };
      },
    },
    removeList(state, action) {
      return state.filter((taskList) => taskList.id !== action.payload);
    },
    addTaskToList: (state, action) => {
      const { taskId, name, difficulty, description } = action.payload;
      const id = nanoid();
      const idx = state.findIndex((list) => list.id === taskId);
      idx >= 0 &&
        state[idx].tasks.push({
          id,
          name,
          difficulty,
          description,
          isDone: false,
        });
    },
    changeTaskCompletition: (state, action) => {
      const { listId, taskId } = action.payload;
      const [listIdx, taskIdx] = findIndexPair(state, listId, taskId);
      if (listIdx < 0 || taskIdx < 0) return;
      state[listIdx].tasks[taskIdx].isDone =
        !state[listIdx].tasks[taskIdx].isDone;
    },
    editTask: (state, action) => {
      const { listId, taskId, name, difficulty, description, isDone } =
        action.payload;
      const [listIdx, taskIdx] = findIndexPair(state, listId, taskId);
      if (listIdx < 0 || taskIdx < 0) return;
      if (name !== undefined) state[listIdx].tasks[taskIdx].name = name;
      if (difficulty !== undefined)
        state[listIdx].tasks[taskIdx].difficulty = difficulty;
      if (description !== undefined)
        state[listIdx].tasks[taskIdx].description = description;
      if (isDone !== undefined) state[listIdx].tasks[taskIdx].isDone = isDone;
    },
  },
});

export const {
  addList,
  removeList,
  addTaskToList,
  changeTaskCompletition,
  editTask,
} = taskListsSlice.actions;
export default taskListsSlice.reducer;
