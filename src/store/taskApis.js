import appStorage from './appStorage';

const taskData = {
  key: 'tasks',
  list: [],
  idMap: {
    // id: {
    //   id,
    //   name,
    //   categoryId,
    //   isAllDay,
    //   startTime,
    //   endTime,
    //   hasEndTime,
    //   times,
    //   autoResetTimes,
    //   overType,
    //   timesResetType,
    //   remarks,
    // }
  },
};

const readyCallbacks = [];

appStorage
  .get(taskData.key)
  .then((res) => {
    taskData.idMap = res;
    taskData.list = Object.values(res);
  })
  .finally(() => {
    taskApis.isReady = true;
    readyCallbacks.forEach((callback) => callback());
    readyCallbacks.length = 0;
  });

const taskApis = {
  isReady: false,
  addOrEditTask(task) {
    task.startTime = new Date(task.startTime).valueOf();
    task.endTime = new Date(task.endTime).valueOf();
    if (task.id) {
      Object.assign(taskData.idMap[task.id], task);
    } else {
      task.id = Date.now();
      taskData.idMap[task.id] = task;
      taskData.list.push(task);
    }
    appStorage.set(taskData.key, taskData.idMap);
  },
  getByTimeRange(start, end) {
    const startValue = new Date(start).valueOf();
    const endValue = new Date(end).valueOf();
    return taskData.list
      .filter((task) => task.startTime <= endValue && task.endTime >= startValue)
      .map((task) => ({ ...task }));
  },
  onReady(callback) {
    if (this.isReady) {
      callback();
    } else {
      readyCallbacks.push(callback);
    }
  },
};

export default taskApis;
