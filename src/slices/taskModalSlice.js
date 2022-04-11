import { createSlice } from "@reduxjs/toolkit";

export const toggleTypes = {
  TOGGLE_NONE: 0,
  TOGGLE_NEW_LIST: 1,
  TOGGLE_NEW_TASK: 2,
};
const initialState = {
  isToggled: false,
  togglerId: -1,
  toggleType: toggleTypes.TOGGLE_NONE,
};
const taskModalSlice = createSlice({
  name: "taskModal",
  initialState,
  reducers: {
    turnOnModal(state, action) {
      return {
        isToggled: true,
        togglerId: action.payload.id || -1,
        toggleType: action.payload.type || toggleTypes.TOGGLE_NONE,
      };
    },
    turnOffModal() {
      return {
        isToggled: false,
        togglerId: -1,
        toggleType: toggleTypes.TOGGLE_NONE,
      };
    },
  },
});

export const { turnOffModal, turnOnModal } = taskModalSlice.actions;
export default taskModalSlice.reducer;
