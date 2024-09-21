import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  SectionList,
  StyleSheet,
  StatusBar,
  FlatList,
  TouchableWithoutFeedback,
} from 'react-native';
import commonStyle from '../styles/commonStyle';

import PageOuter from './PageOuter';
import taskApis from '../store/taskApis';
import userSetting from '../store/userSetting';

const toDay = new Date(`${new Date().toLocaleDateString('zh').replaceAll('/', '-')}`).valueOf();
const toDayEnd = toDay + 1000 * 60 * 60 * 24;

function TaskItem({ task }) {
  const category = userSetting.taskCategorys.find((item) => item.id === task.categoryId);
  const categoryColor = category ? category.color : userSetting.themeColor;
  const [renderKey, setRenderKey] = useState(false);

  function getShowTimes() {
    if (task.isAllDay) {
      return ['全天'];
    } else if (task.overType === 'taskTimes') {
      if (task.startTime >= toDay) {
        return [task.startTime.toLocaleTimeString('zh').slice(0, -3), '开始'];
      } else {
        return ['打卡', '结束'];
      }
    } else if (task.startTime >= toDay) {
      if (task.endTime <= toDayEnd) {
        return [
          task.startTime.toLocaleTimeString('zh').slice(0, -3),
          task.endTime.toLocaleTimeString('zh').slice(0, -3),
        ];
      } else {
        return [task.startTime.toLocaleTimeString('zh').slice(0, -3), '开始'];
      }
    } else if (task.endTime <= toDayEnd) {
      return [task.endTime.toLocaleTimeString('zh').slice(0, -3), '结束'];
    } else {
      return ['全天'];
    }
  }

  function oneTimeTask() {
    if (task.isOver === true) {
      task.isOver = false;
      task.clocks = [];
    } else if (task.clocks) {
      task.clocks.push(Date.now());
    } else {
      task.clocks = [Date.now()];
    }
    if (task.clocks.length >= task.times) {
      task.isOver = true;
    }
    taskApis.addOrEditTask({ ...task });
    setRenderKey(!renderKey);
  }

  function gotoEditTaskPage() {
    store.changePage('editPage', { id: task.id });
  }

  return (
    <TouchableWithoutFeedback onPress={oneTimeTask} onLongPress={gotoEditTaskPage}>
      <View style={{ opacity: task.clocks?.length >= task.times ? 0.5 : 1 }}>
        <View style={styles.taskItem}>
          <View style={[styles.taskItemCategory, { backgroundColor: categoryColor }]} />
          <View style={styles.taskItemText}>
            <Text style={styles.taskItemName} numberOfLines={1} ellipsizeMode='tail'>
              {task.name}
            </Text>
            <View style={styles.taskItemInfo}>
              {task.times > 1 && (
                <Text
                  style={[styles.taskItemInfoTimes, { backgroundColor: categoryColor }]}
                  numberOfLines={1}
                  ellipsizeMode='tail'>
                  {task.clocks ? task.clocks.length : 0}/{task.times}
                </Text>
              )}
              {task.remarks && (
                <Text style={styles.taskItemRemarks} numberOfLines={1} ellipsizeMode='tail'>
                  {task.remarks.replaceAll('\n', ' ')}
                </Text>
              )}
            </View>
          </View>
          <View style={styles.taskItemTimes}>
            {getShowTimes().map((text, index) => (
              <Text key={index} style={styles.taskItemTime}>
                {text}
              </Text>
            ))}
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

export default function TaskPage() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    taskApis.onReady(() => {
      const newTaskList = taskApis.getTodayTasks();
      newTaskList
        .sort((task1, task2) => task1.startTime - task2.startTime)
        .forEach((task) => {
          task.startTime = new Date(task.startTime);
          task.endTime = new Date(task.endTime);
        });
      setTaskList(newTaskList);
    });
  }, []);

  return (
    <PageOuter title='今日任务'>
      <FlatList
        style={styles.taskList}
        data={taskList}
        renderItem={({ item }) => <TaskItem task={item} />}
        keyExtractor={(task) => task.id}
      />
    </PageOuter>
  );
}

const styles = StyleSheet.create({
  taskList: {
    padding: 10,
    paddingBottom: 1000,
  },
  taskItem: {
    ...commonStyle.rowFlex,
    gap: 10,
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 20,
    height: 65,
    backgroundColor: '#fffe',
  },
  taskItemCategory: {
    height: '100%',
    width: 4,
    borderRadius: 10,
  },
  taskItemText: {
    height: '100%',
    flex: 1,
    gap: 2,
    justifyContent: 'center',
  },
  taskItemName: {
    fontSize: 20,
    lineHeight: 25,
    color: '#333',
  },
  taskItemInfo: {
    ...commonStyle.rowFlex,
    gap: 10,
  },
  taskItemInfoTimes: {
    fontSize: 13,
    paddingHorizontal: 10,
    borderRadius: 10,
    lineHeight: 17,
    color: '#fff',
    opacity: 0.9,
  },
  taskItemRemarks: {
    fontSize: 13,
    color: '#333',
  },
  taskItemTimes: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  taskItemTime: {
    fontSize: 15,
    color: '#333',
  },
});
