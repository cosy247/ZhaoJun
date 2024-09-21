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
    //   times,
    //   autoResetTimes,
    //   overType,
    //   timesResetType,
    //   remarks,

    //   clocks: [],
    //   isOver: 0,
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
    taskApis.isDataReady = true;
    readyCallbacks.forEach((callback) => callback());
    readyCallbacks.length = 0;
  });

const taskApis = {
  isDataReady: false,
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
  getTodayTasks() {
    const todayString = new Date().toLocaleDateString('zh').replaceAll('/', '-');
    return taskApis.getByTimeRange(`2020-1-1 00:00:00`, `2030-1-1 23:59:59`);
    return taskApis.getByTimeRange(`${todayString} 00:00:00`, `${todayString} 23:59:59`);
  },
  onReady(callback) {
    if (this.isDataReady) {
      callback();
    } else {
      readyCallbacks.push(callback);
    }
  },
};

export default taskApis;
