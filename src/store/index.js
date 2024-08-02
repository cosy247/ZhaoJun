export default store = {
  isReady: false,
  changePage: undefined,
  overTypes: [
    { type: 'endTime', name: '时间' },
    { type: 'taskTimes', name: '打卡' },
  ],
  taskTimesResetTypes: [
    { type: 'hourse', name: '小时' },
    { type: 'week', name: '周' },
    { type: 'month', name: '月' },
  ],
  message: {
    success: undefined,
    warnning: undefined,
    error: undefined,
  }
};
