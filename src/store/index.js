export default store = {
  isDataReady: false,
  currentMenuIndex: [0 ,0],
  menuList: [
    {
      icon: '\ue701',
      activeIcon: '\ue606',
      childrenIndex: 0,
      childrens: [
        { name: '日任务', page: 'dayTask', isActive: false },
        { name: '分类任务', page: 'categoryTask', isActive: false },
        { name: '周任务', page: 'weekTask', isActive: false },
        { name: '月任务', page: 'monthTask', isActive: false },
      ],
    },
    {
      icon: '\ue702',
      activeIcon: '\ue700',
      childrenIndex: 0,
      childrens: [{ name: '日报' }, { name: '周报' }, { name: '月报' }, { name: '年报' }],
    },
    {
      icon: '\ue875',
      activeIcon: '\ue600',
      childrenIndex: 0,
      childrens: [
        { name: '新增任务', page: 'craeteTask', isActive: false },
        { name: '新增习惯', page: 'craeteHabit', isActive: false },
        { name: '新增倒计时', page: 'craeteCountdown', isActive: false },
      ],
    },
    {
      icon: '\ue703',
      activeIcon: '\ue601',
      childrenIndex: 0,
      childrens: [{ name: '设置' }],
    },
  ],
  changePage: undefined,
  overTypes: [
    { type: 'endTime', name: '时间' },
    { type: 'taskTimes', name: '打卡' },
    { type: 'noEnd', name: '无' },
  ],
  taskTimesResetTypes: [
    { type: 'day', name: '天' },
    { type: 'week', name: '周' },
    { type: 'month', name: '月' },
  ],
  taskCircularTypes: [
    { type: 'day', name: '天' },
    { type: 'week', name: '周' },
    { type: 'month', name: '月' },
    { type: 'year', name: '年' },
  ],
  message: {
    success: undefined,
    warnning: undefined,
    error: undefined,
  },
};
