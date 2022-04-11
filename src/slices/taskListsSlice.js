import { createSlice, nanoid } from "@reduxjs/toolkit";

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
      const { taskId, name, difficulty } = action.payload;
      const id = nanoid();
      const idx = state.findIndex((list) => list.id === taskId);
      idx >= 0 &&
        state[idx].tasks.push({ id, name, difficulty, isDone: false });
    },
  },
});

export const { addList, removeList, addTaskToList } = taskListsSlice.actions;
export default taskListsSlice.reducer;
