import React from 'react';
import { ScrollView, View, Text, StyleSheet } from 'react-native';

export default function TaskPage(props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.title}</Text>
      <ScrollView style={styles.content}>
        {props.children}
        <View style={styles.bottom}></View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
  title: {
    fontFamily: 'regular',
    fontSize: 25,
    textAlign: 'center',
    lineHeight: 50,
    height: 43,
  },
  content: {
    padding: 10,
  },
  bottom: {
    height: 120,
  },
});
