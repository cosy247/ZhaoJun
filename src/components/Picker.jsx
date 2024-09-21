import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import commonStyle from '../styles/commonStyle';

export default function Picker() {
  return (
    <View style={styles.container}>
      <View style={styles.content}></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyle.rowFlexCenter,
    position: 'absolute',
    backgroundColor: '#fff8',
    zIndex: 999,
    height: '100%',
    width: '100%',
  },
  content: {
    
  }
});
