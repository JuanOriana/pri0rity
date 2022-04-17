const MAX_DIFF = 3;

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

export function findOptimalTask(state) {
  let maxListIdx = -1;
  let maxTask = undefined;
  let maxSum = 0;
  state.forEach((list, idx) => {
    const sum = list.tasks.reduce(
      (partialSum, task) => partialSum + (task.isDone ? 0 : task.difficulty),
      0
    );
    if (sum > maxSum) {
      maxSum = sum;
      maxListIdx = idx;
    }
  });
  if (maxListIdx < 0) return undefined;
  let maxDiff = 0;
  let chosen = false;
  state[maxListIdx].tasks.forEach((task) => {
    if (!task.isDone && !chosen) {
      if (task.difficulty === MAX_DIFF) chosen = true;
      if (task.difficulty > maxDiff) {
        maxDiff = task.difficulty;
        maxTask = task;
      }
    }
  });
  return { ...maxTask, list: state[maxListIdx] };
}
