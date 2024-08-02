import React from 'react';
import { ScrollView, View, Text, SectionList, StyleSheet, StatusBar, FlatList } from 'react-native';
import commonStyle from '../styles/commonStyle';

import PageOuter from './PageOuter'


export default function TaskPage() {
  return (
    <PageOuter title='今日任务'>

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
