import React from 'react';
import { SafeAreaView, StatusBar, useColorScheme, StyleSheet } from 'react-native';
import Home from './pages/Home';
import MenuTabs from './components/MenuTabs';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import "react-native-gesture-handler";

const backgroundColor = '#fcfefd';

// const Stack = createNativeStackNavigator();

function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' backgroundColor={backgroundColor} />
      {/* <NavigationContainer>
        <Stack.Navigator initialRouteName='Home'>
          <Stack.Screen name='Home' component={Home} />
          <Stack.Screen name='Hom2e' component={Home} />
        </Stack.Navigator>
      </NavigationContainer> */}
      <Home></Home>
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

export default App;
