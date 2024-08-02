import React, { useEffect, useState } from 'react';
import { ScrollView, View, Text, SectionList, StyleSheet, StatusBar, FlatList } from 'react-native';
import commonStyle from '../styles/commonStyle';

import PageOuter from './PageOuter';
import taskApis from '../store/taskApis';

function TaskItem({ task, index }) {
  return (
    <View>
      <Text>
        {index}
        {task.name}
      </Text>
    </View>
  );
}

export default function TaskPage() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    taskApis.onReady(() => {
      const todayString = new Date().toLocaleDateString('zh').replaceAll('/', '-');
      const newTaskList = taskApis.getByTimeRange(`${todayString} 00:00:00`, `${todayString} 23:59:59`);
      newTaskList.forEach((task) => {
        task.startTime = new Date(task.startTime);
        task.endTime = new Date(task.endTime);
      });
      setTaskList(newTaskList);
    });
  }, []);

  return (
    <PageOuter title='今日任务'>
      <FlatList
        data={taskList}
        renderItem={({ item, index }) => <TaskItem task={item} index={index} />}
        keyExtractor={(task) => task.id}
      />
    </PageOuter>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingBottom: 100,
  },
  header: {
    ...commonStyle.rowFlexCenter,
  },
  title: {
    fontFamily: 'regular',
    fontSize: 20,
  },
});
