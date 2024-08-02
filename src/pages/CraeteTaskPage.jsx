import {
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Switch,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';

import userSetting from '../store/userSetting';
import DatePicker from 'react-native-date-picker';
import commonStyle from '../styles/commonStyle';
import store from '../store';
import tasks from '../store/tasks';
import PageOuter from './PageOuter';

function TaskItem(props) {
  return (
    <View style={[styles.taskItem, props.style]}>
      <View style={styles.taskItemHeader}>
        <View style={styles.taskItemCircle} />
        <Text style={styles.taskItemTitle}>{props.title}</Text>
      </View>
      {props.children && <View style={styles.taskItemContent}>{props.children}</View>}
    </View>
  );
}

function LineItem(props) {
  return (
    <View style={{ marginTop: props.marginTop || 15 }}>
      <View style={styles.lineItem}>
        <Text style={styles.lineItemTile}>{props.title}</Text>
        <View style={props.contentTyle}>{props.children}</View>
      </View>
      {props.describe && <Text style={styles.lineItemDescribe}>{props.describe}</Text>}
    </View>
  );
}

export default function CraeteTask() {
  const [task, changeTask] = useState({
    name: '',
    categoryId: userSetting.taskCategorys[0].id,
    isAllDay: false,
    startTime: new Date(),
    endTime: new Date(),
    hasEndTime: true,
    times: '1',
    autoResetTimes: false,
    overType: store.overTypes[0].type,
    timesResetType: store.taskTimesResetTypes[0].type,
    remarks: '',
  });
  const [datePicker, changeDatePicker] = useState({
    isOpen: false,
    data: undefined,
    mode: undefined,
    changeData: undefined,
  });

  function addTask() {
    if (task.name === '') {
      store.message.warnning('请输入任务名称！');
    } else {
      tasks.addOrEditTask(task);
      store.message.success('创建任务成功！');
      changeTask({ ...task, name: '' });
    }
  }

  function changeStartTime(startTime, type) {
    if (type === 'd') {
      startTime.setHours(task.startTime.getHours());
      startTime.setMinutes(task.startTime.getMinutes());
    } else {
      startTime.setFullYear(task.startTime.getFullYear());
      startTime.setMonth(task.startTime.getMonth());
      startTime.setDate(task.startTime.getDate());
    }
    if (task.endTime.valueOf() < startTime.valueOf()) {
      changeTask({ ...task, endTime: startTime, startTime });
    } else {
      changeTask({ ...task, startTime });
    }
  }

  function changeEndTime(endTime, type) {
    if (type === 'd') {
      endTime.setHours(task.endTime.getHours());
      endTime.setMinutes(task.endTime.getMinutes());
    } else {
      endTime.setFullYear(task.endTime.getFullYear());
      endTime.setMonth(task.endTime.getMonth());
      endTime.setDate(task.endTime.getDate());
    }
    if (task.startTime.valueOf() > endTime.valueOf()) {
      changeTask({ ...task, startTime: endTime, endTime });
    } else {
      changeTask({ ...task, endTime });
    }
  }

  return (
    <PageOuter title='新增任务'>
      <TextInput
        multiline={true}
        value={task.name}
        style={styles.nameInput}
        placeholder='任务名称'
        onChangeText={(name) => changeTask({ ...task, name })}
      />
      <TaskItem title='任务类别'>
        <View style={styles.categorys}>
          {userSetting.taskCategorys.map((taskCategory) => (
            <TouchableWithoutFeedback
              onPress={() => changeTask({ ...task, categoryId: taskCategory.id })}
              key={taskCategory.id}>
              <Text style={taskCategory.id === task.categoryId ? styles.categoryActive : styles.category}>
                {taskCategory.name}
              </Text>
            </TouchableWithoutFeedback>
          ))}
        </View>
      </TaskItem>
      <TaskItem title='执行时间'>
        <LineItem title='全天'>
          <Switch
            trackColor={{ false: '#aaa', true: userSetting.themeColor }}
            thumbColor={task.isAllDay ? userSetting.themeColor : '#eee'}
            value={task.isAllDay}
            onValueChange={(isAllDay) => changeTask({ ...task, isAllDay })}
          />
        </LineItem>
        <LineItem title='结束方式'>
          <View style={[styles.categorys, { marginTop: 0 }]}>
            {store.overTypes.map((overType) => (
              <TouchableWithoutFeedback
                onPress={() => changeTask({ ...task, overType: overType.type })}
                key={overType.type}>
                <Text style={overType.type === task.overType ? styles.categoryActive : styles.category}>
                  {overType.name}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </View>
        </LineItem>
        <LineItem title='开始时间'>
          <View style={styles.lineItemDateShow}>
            <TouchableWithoutFeedback
              onPress={() =>
                changeDatePicker({
                  isOpen: true,
                  mode: 'date',
                  data: task.startTime,
                  changeData: (startTime) => changeStartTime(startTime, 'd'),
                })
              }>
              <Text style={styles.lineItemValue}>
                {task.startTime.toLocaleDateString('zh', {
                  year: 'numeric',
                  month: 'narrow',
                  day: 'numeric',
                })}
              </Text>
            </TouchableWithoutFeedback>
            {task.isAllDay || (
              <TouchableWithoutFeedback
                onPress={() =>
                  changeDatePicker({
                    isOpen: true,
                    mode: 'time',
                    data: task.startTime,
                    changeData: (startTime) => changeStartTime(startTime, 't'),
                  })
                }>
                <Text style={styles.lineItemValue}>
                  {task.startTime.toLocaleTimeString('zh').slice(0, -3)}
                </Text>
              </TouchableWithoutFeedback>
            )}
          </View>
        </LineItem>
        {task.overType === 'endTime' && (
          <LineItem title='结束时间'>
            <View style={styles.lineItemDateShow}>
              <TouchableWithoutFeedback
                onPress={() =>
                  changeDatePicker({
                    isOpen: true,
                    mode: 'date',
                    data: task.endTime,
                    changeData: (endTime) => changeEndTime(endTime, 'd'),
                  })
                }>
                <Text style={styles.lineItemValue}>
                  {task.endTime.toLocaleDateString('zh', {
                    year: 'numeric',
                    month: 'narrow',
                    day: 'numeric',
                  })}
                </Text>
              </TouchableWithoutFeedback>
              {!task.isAllDay && (
                <TouchableWithoutFeedback
                  onPress={() =>
                    changeDatePicker({
                      isOpen: true,
                      mode: 'time',
                      data: task.endTime,
                      changeData: (endTime) => changeEndTime(endTime, 't'),
                    })
                  }>
                  <Text style={styles.lineItemValue}>
                    {task.endTime.toLocaleTimeString('zh').slice(0, -3)}
                  </Text>
                </TouchableWithoutFeedback>
              )}
            </View>
          </LineItem>
        )}
      </TaskItem>
      <TaskItem title='打卡行为'>
        <LineItem title='完成次数'>
          <TextInput
            value={task.times}
            onBlur={(times) => changeTask({ ...task, times: `${Number(times) || 1}` })}
            style={styles.taskTimesInput}
          />
        </LineItem>
        {task.overType === 'endTime' && (
          <LineItem title='自动重置打卡次数'>
            <Switch
              trackColor={{ false: '#aaa', true: userSetting.themeColor }}
              thumbColor={task.autoResetTimes ? userSetting.themeColor : '#eee'}
              value={task.autoResetTimes}
              onValueChange={(autoResetTimes) => changeTask({ ...task, autoResetTimes })}
            />
          </LineItem>
        )}
        {task.overType === 'endTime' && task.autoResetTimes && (
          <LineItem title='重置间隔' contentTyle={styles.lineItemDateShow}>
            <TextInput
              value={task.times}
              onBlur={(times) => changeTask({ ...task, times: `${Number(times) || 1}` })}
              style={styles.taskTimesInput}
            />
            {store.taskTimesResetTypes.map((timesResetType) => (
              <TouchableWithoutFeedback
                onPress={() => changeTask({ ...task, timesResetType: timesResetType.type })}
                key={timesResetType.type}>
                <Text
                  style={
                    timesResetType.type === task.timesResetType ? styles.categoryActive : styles.category
                  }>
                  {timesResetType.name}
                </Text>
              </TouchableWithoutFeedback>
            ))}
          </LineItem>
        )}
      </TaskItem>
      <TaskItem title='备注'>
        <TextInput
          multiline={true}
          value={task.remarks}
          style={styles.remarks}
          placeholder='在此输入'
          onChange={(remarks) => changeTask({ ...task, remarks })}
        />
      </TaskItem>

      <TouchableWithoutFeedback onPress={addTask}>
        <View style={styles.submitOuter}>
          <Text style={styles.submit}>创建</Text>
        </View>
      </TouchableWithoutFeedback>

      <DatePicker
        modal
        locale='zh'
        mode={datePicker.mode}
        title='时间选择'
        is24hourSource='locale'
        confirmText='确认'
        cancelText='取消'
        open={datePicker.isOpen}
        date={task.startTime}
        onConfirm={(date) => {
          changeDatePicker({ ...datePicker, isOpen: false });
          datePicker.changeData(date);
        }}
        onCancel={() => {
          changeDatePicker({ ...datePicker, isOpen: false });
        }}
      />
    </PageOuter>
  );
}

const styles = StyleSheet.create({
  type: {
    fontSize: 15,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderRadius: 100,
    lineHeight: 30,
  },
  typeActive: {
    backgroundColor: userSetting.themeColor,
    fontSize: 15,
    paddingHorizontal: 20,
    borderRadius: 100,
    color: '#fff',
    lineHeight: 30,
  },
  nameInput: {
    fontSize: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    color: userSetting.themeColor,
  },
  taskItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  taskItemHeader: {
    ...commonStyle.rowFlex,
  },
  taskItemCircle: {
    height: 14,
    width: 14,
    backgroundColor: userSetting.themeColor,
    borderRadius: 100,
  },
  taskItemTitle: {
    fontSize: 15,
    marginLeft: 10,
    lineHeight: 20,
  },
  taskItemContent: {},
  categorys: {
    ...commonStyle.rowFlex,
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 20,
  },
  category: {
    backgroundColor: '#f8f7f6',
    paddingHorizontal: 15,
    lineHeight: 28,
    fontSize: 15,
    borderRadius: 100,
  },
  categoryActive: {
    backgroundColor: userSetting.themeColor,
    paddingHorizontal: 15,
    lineHeight: 28,
    fontSize: 15,
    borderRadius: 100,
    color: '#fff',
  },
  lineItem: {
    ...commonStyle.rowFlexSpaceBetween,
    marginTop: 10,
  },
  lineItemLeft: {
    ...commonStyle.rowFlex,
  },
  lineItemTile: {
    fontSize: 16,
    lineHeight: 22,
  },
  lineItemDescribe: {
    fontSize: 12,
    marginTop: 10,
  },
  lineItemDateShow: {
    ...commonStyle.rowFlex,
    gap: 10,
  },
  lineItemValue: {
    fontSize: 15,
    backgroundColor: '#f1f1f1',
    borderRadius: 100,
    paddingHorizontal: 10,
    lineHeight: 28,
  },
  taskTimesInput: {
    backgroundColor: '#f8f7f6',
    paddingVertical: 0,
    paddingLeft: 15,
    lineHeight: 28,
    height: 30,
    fontSize: 15,
    borderRadius: 100,
  },
  remarks: {
    fontSize: 18,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginTop: 10,
    color: '#333',
  },
  submitOuter: {
    ...commonStyle.rowFlexCenter,
  },
  submit: {
    marginTop: 20,
    width: 100,
    lineHeight: 40,
    backgroundColor: userSetting.themeColor,
    borderRadius: 100,
    textAlign: 'center',
    marginVertical: 'auto',
    color: '#fff',
    fontSize: 20,
  },
});
