import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useState } from 'react';

import commonStyles from '../styles/commonStyle';
import Animation from './Animation';
import store from '../store';

const menuList = [
  {
    icon: '\ue701',
    activeIcon: '\ue606',
    childrenIndex: 0,
    childrens: [
      { name: '日任务', page: 'dayTask' },
      { name: '分类任务', page: 'categoryTask' },
      { name: '周任务', page: 'weekTask' },
      { name: '月任务', page: 'monthTask' },
    ],
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
    childrens: [
      { name: '新增任务', page: 'craeteTask' },
      { name: '新增习惯', page: 'craeteHabit' },
      { name: '新增倒计时', page: 'craeteCountdown' },
    ],
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
  // const [childrenName, changeChildrenName] = useState('');
  const [renderKey, changeRenderKey] = useState(0);

  function gotoMenu(menuIndex) {
    if (lastMenuIndex === menuIndex) {
      menuList[menuIndex].childrenIndex += 1;
      menuList[menuIndex].childrenIndex %= menuList[menuIndex].childrens.length;
    } else {
      changeLastMenuIndex(menuIndex);
    }
    const targetMenu = menuList[menuIndex].childrens[menuList[menuIndex].childrenIndex];
    // changeChildrenName(targetMenu.name);
    store.changePage(targetMenu.page);
    changeRenderKey(renderKey + 1);
  }

  return (
    <View style={styles.container}>
      {/* <Animation
        isText={true}
        style={styles.childrenName}
        animationStyle={{ opacity: [1, 0] }}
        duration={2000}
        renderKey={renderKey}
        isStartRender={false}>
        {childrenName}
      </Animation> */}
      <View style={styles.menus}>
        {menuList.map((menuItem, index) => (
          <TouchableWithoutFeedback onPress={() => gotoMenu(index)} key={index}>
            {lastMenuIndex === index ? (
              <View>
                <Animation
                  isText={true}
                  style={styles.menu}
                  animationStyle={{ opacity: [0.5, 1] }}
                  duration={500}
                  renderKey={renderKey}
                  isStartRender={false}>
                  {menuItem.activeIcon}
                </Animation>
              </View>
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
    bottom: 30,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  childrenName: {
    fontSize: 18,
    marginBottom: 5,
  },
  menus: {
    ...commonStyles.rowFlex,
    ...commonStyles.shadow,
    gap: 25,
    backgroundColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 25,
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
