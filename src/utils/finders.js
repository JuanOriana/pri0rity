export function findIndexPair(state, listId, taskId) {
  const listIdx = state.findIndex((list) => list.id === listId);
  if (listIdx < 0) return [-1, -1];
  const taskIdx = state[listIdx].tasks.findIndex((task) => task.id === taskId);
  return [listIdx, taskIdx];
}

export function findTask(state, listId, taskID) {
  const [listIdx, taskidx] = findIndexPair(state, listId, taskID);
  return state[listIdx].tasks[taskidx];
}
