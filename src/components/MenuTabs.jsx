import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';

import commonStyles from '../styles/commonStyle';
import Animation from './Animation';

const menuList = [
  {
    icon: '\ue701',
    activeIcon: '\ue606',
    childrenIndex: 0,
    childrens: [{ name: '分类任务' }, { name: '日任务' }, { name: '周任务' }, { name: '月任务' }],
  },
  {
    icon: '\ue702',
    activeIcon: '\ue700',
    childrenIndex: 0,
    childrens: [{ name: '日报' }, { name: '周报' }, { name: '月报' }, { name: '年报' }],
  },
  {
    icon: '\ue875',
    activeIcon: '\ue600',
    childrenIndex: 0,
    childrens: [{ name: '新增' }],
  },
  {
    icon: '\ue703',
    activeIcon: '\ue601',
    childrenIndex: 0,
    childrens: [{ name: '设置' }],
  },
];

function Menutabs() {
  const [lastMenuIndex, changeLastMenuIndex] = useState(0);
  const [childrenName, changeChildrenName] = useState('');
  const [renderKey, changeRenderKey] = useState(0);

  function gotoMenu(menuIndex) {
    if (lastMenuIndex === menuIndex) {
      menuList[menuIndex].childrenIndex += 1;
      menuList[menuIndex].childrenIndex %= menuList[menuIndex].childrens.length;
      changeChildrenName(menuList[menuIndex].childrens[menuList[menuIndex].childrenIndex].name);
    } else {
      changeLastMenuIndex(menuIndex);
      changeChildrenName(menuList[menuIndex].childrens[menuList[menuIndex].childrenIndex].name);
    }
    changeRenderKey(renderKey + 1);
  }

  return (
    <View style={styles.container}>
      <Animation
        isText={true}
        style={styles.childrenName}
        animationStyle={{ opacity: [1, 0] }}
        duration={2000}
        renderKey={renderKey}
        isStartRender={false}>
        {childrenName}
      </Animation>
      <View style={styles.menus}>
        {menuList.map((menuItem, index) => (
          <TouchableWithoutFeedback onPress={() => gotoMenu(index)} key={index}>
            {lastMenuIndex === index ? (
              <Animation
                isText={true}
                style={styles.menu}
                animationStyle={{ opacity: [0.5, 1] }}
                duration={500}
                renderKey={renderKey}
                isStartRender={false}>
                {menuItem.activeIcon}
              </Animation>
            ) : (
              <Text style={styles.menu}>{menuItem.icon}</Text>
            )}
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childrenName: {
    fontSize: 16,
    marginBottom: 10,
  },
  menus: {
    ...commonStyles.rowFlex,
    ...commonStyles.shadow,
    gap: 25,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
  },
  menu: {
    fontFamily: 'iconfont',
    fontSize: 25,
    color: '#9e9e9e',
    width: 30,
    textAlign: 'center',
  },
  menuActive: {
    color: '#9a8',
  },
});

export default Menutabs;
