import { StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import React, { useState } from 'react';

import userSetting from '../store/userSetting';

export default function CheckBox({ value, onChange }) {
  const [checked, changeChecked] = useState(!!value);

  function handleChange(checked) {
    changeChecked(checked);
    if (typeof onChange === 'function') {
      onChange(checked);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={() => handleChange(!checked)}>
      <Text style={styles.checkBox}>{checked ? '√' : ''}</Text>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  checkBox: {
    height: 20,
    width: 20,
    borderColor: userSetting.themeColor,
    borderWidth: 2,
    textAlign: 'center',
    lineHeight: 20,
    fontSize: 15,
    color: userSetting.themeColor,
    borderRadius: 5,
  },
});
