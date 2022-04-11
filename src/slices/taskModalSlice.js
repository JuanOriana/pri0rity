import { createSlice } from "@reduxjs/toolkit";

const initialState = { isToggled: false, togglerId: -1 };
const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    toggleTaskModal(state, action) {
      return {
        isToggled: !state.isToggled,
        togglerId: action.payload || -1,
      };
    },
  },
});

export const { toggleTaskModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
