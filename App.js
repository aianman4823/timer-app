import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createBottomTabNavigator, createDrawerNavigator, createAppContainer } from 'react-navigation';
import { fromLeft, fromBottom } from 'react-navigation-transitions';

import Main from './src/screens/Main';
import SettingTimer from './src/screens/SettingTimer';
import SubMain from './src/screens/subMain';


import WantUse from './src/helpbar/user';
import HowUse from './src/helpbar/howuse';
import Setting from './src/helpbar/Setting';
import DesHelp from './src/helpbar/DesHelp';
import CountTimer from './src/Timer/timer';
import DynamicListExample from './src/listpage/Dynamic_list';
import ListDetail from './src/listdetail/listdetail';
import SettingTimerSecond from './src/screens/SettingTimerSecond';
import UselessTextInput from './src/listpage/addlist';
import CountTimerSecond from './src/Timer/timersecond';


const handleCustomTransition = ({ scenes }) => {
  const prevScene = scenes[scenes.length - 2];
  const nextScene = scenes[scenes.length - 1];

  if (prevScene && prevScene.route.routeName === 'Main' && nextScene.route.routeName === 'Setting') {
    return fromBottom();
  }else if (prevScene && prevScene.route.routeName === 'Main' && nextScene.route.routeName === 'SettingTimer'){
    return fromBottom();
  }
  return fromLeft();
}




const Stack = createStackNavigator(
  {
    Main: { screen: Main },
    SubMain: { screen: SubMain },
    SettingTimer: { screen: SettingTimer },
    WantUse: { screen: WantUse },
    HowUse: { screen: HowUse },
    Setting: { screen: Setting },
    DesHelp: { screen: DesHelp },
    CountTimer: { screen: CountTimer },
    DynamicListExample:{screen:DynamicListExample},
    ListDetail:{screen:ListDetail},
    SettingTimerSecond:{screen:SettingTimerSecond},
    UselessTextInput:{screen:UselessTextInput},
    CountTimerSecond:{screen:CountTimerSecond},
  },
  {
    initialRouteName: 'Main',
    transitionConfig: (nav) => handleCustomTransition(nav),
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
);

const AppContainer = createAppContainer(Stack)

export default class App extends React.Component {
  render() {
    return (
      <AppContainer style={styles.container} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
