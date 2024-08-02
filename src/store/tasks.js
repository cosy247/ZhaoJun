import appStorage from './appStorage';

const tasks = {
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

appStorage.get(tasks.key).then((res) => {
  tasks.idMap = res;
  tasks.list = Object.values(res);
});

export default {
  addOrEditTask(task) {
    task.startTime = new Date(task.startTime).valueOf();
    task.endTime = new Date(task.endTime).valueOf();
    if (task.id) {
      Object.assign(tasks.idMap[task.id], task);
    } else {
      task.id = Date.now();
      tasks.idMap[task.id] = task;
      tasks.list.push(task);
    }
    appStorage.set(tasks.key, tasks.idMap);
  },
  getByTimeRange(start, end) {
    const startValue = new Date(start).valueOf();
    const endValue = new Date(end).valueOf();
    return tasks.list
      .filter((task) => task.startTime <= endValue && task.endTime >= startValue)
      .map((task) => ({ ...task }));
  },
};
