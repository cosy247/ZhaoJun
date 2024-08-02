import React, { useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet, Text, ScrollView, View } from 'react-native';
import store from './store';

import TaskPage from './pages/TaskPage';
import CraeteTaskPage from './pages/CraeteTaskPage';
import MenuTabs from './components/MenuTabs';
import Message from './components/Message';

const backgroundColor = '#f6f7fa';

export default function App() {
  const [page, changePage] = useState('TaskPage');

  store.changePage = changePage;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={backgroundColor} />
      {
        {
          categoryTask: <TaskPage />,
          craeteTask: <CraeteTaskPage />,
        }[page]
      }
      <Message/>
      <MenuTabs />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: backgroundColor,
  },
});
