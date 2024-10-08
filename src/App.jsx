import React, { useState } from 'react';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet, Text, ScrollView, View } from 'react-native';
import store from './store';

import DayTaskPage from './pages/DayTaskPage';
import CraeteTaskPage from './pages/CraeteTaskPage';
import MenuTabs from './components/MenuTabs';
import Message from './components/Message';
import Picker from './components/Picker';

const backgroundColor = '#f6f7fa';

export default function App() {
  const [page, changePage] = useState('dayTask');

  store.changePage = changePage;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={backgroundColor} />
      {
        {
          dayTask: <DayTaskPage />,
          craeteTask: <CraeteTaskPage />,
        }[page]
      }
      {/* <Picker title='时间选择' data={[1, 2, 3, 4, 5]} /> */}
      <Message />
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
