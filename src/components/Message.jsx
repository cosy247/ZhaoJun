import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import Animation from './Animation';
import commonStyle from '../styles/commonStyle';
import store from '../store';

export default function Message() {
  const [renderKey, changeRenderKey] = useState(0);
  const [icon, changeIcon] = useState('');
  const [messageText, changeMessageText] = useState('');

  function show(icon, messageText) {
    changeIcon(icon);
    changeMessageText(messageText);
    changeRenderKey(renderKey + 1);
  }

  store.message.success = (messageText) => show('\ue609', messageText);
  store.message.warnning = (messageText) => show('\ue60b', messageText);
  store.message.error = (messageText) => show('\ue60a', messageText);

  return (
    <Animation
      style={styles.container}
      animationStyle={{ opacity: [1, 0], top: [20, 0] }}
      duration={500}
      delay={1500}
      renderKey={renderKey}
      isStartRender={false}>
      <View style={styles.messageContent}>
        <Text style={styles.messageIcon}>{icon}</Text>
        <Text style={styles.messageText}>{messageText}</Text>
      </View>
    </Animation>
  );
}

const styles = StyleSheet.create({
  container: {
    ...commonStyle.rowFlexCenter,
    width: '100%',
    position: 'absolute',
    top: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  messageContent: {
    ...commonStyle.rowFlex,
    borderWidth: 1,
    borderColor: '#8a78',
    shadowRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    borderRadius: 20,
  },
  messageIcon: {
    fontFamily: 'iconfont',
    fontSize: 20,
    lineHeight: 40,
  },
  messageText: {
    fontFamily: 'iconfont',
    fontSize: 16,
    height: 24,
    marginLeft: 10,
    color: '#333',
  },
});
