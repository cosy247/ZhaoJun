import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { useState } from 'react';
import userSetting from '../store/userSetting';
import commonStyle from '../styles/commonStyle';
import Animation from './Animation';

export default function Switch({value, thumbStyle, trackStyle}) {
  const [cValue, changeCValue] = useState(value);

  return (
    <TouchableWithoutFeedback onPress={() => changeCValue(!cValue)}>
      <Animation
        animationStyle={{
      }}>
        <View style={[cValue ? styles.thumbActive : styles.thumb, thumbStyle]}>
          <View style={[cValue ? styles.trackActive : styles.track, trackStyle]}></View>
        </View>
      </Animation>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  thumb: {
    ...commonStyle.rowFlex,
    width: 50,
    height: 22,
    borderWidth: 2,
    borderRadius: 100,
    borderColor: '#888',
    paddingHorizontal: 2,
  },
  thumbActive: {
    ...commonStyle.rowFlex,
    width: 50,
    height: 22,
    borderWidth: 2,
    borderRadius: 100,
    paddingHorizontal: 2,
    borderColor: userSetting.themeColor,
  },
  track: {
    height: 15,
    width: 15,
    backgroundColor: userSetting.themeColor,
    borderRadius: 10,
  },
  trackActive: {
    height: 15,
    width: 15,
    backgroundColor: userSetting.themeColor,
    borderRadius: 10,
  },
});
