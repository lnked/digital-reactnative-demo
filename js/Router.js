import React from 'react';
import {
  createSwitchNavigator,
  createDrawerNavigator,
  createStackNavigator,
} from 'react-navigation';
import { colors } from '@dormakaba/digital-reactnative-visual';
import { StatusBar } from 'react-native';
import { getStackOptions } from '@dormakaba/digital-reactnative-client';

import { AppDrawer } from './Drawer';
import { Login, Dashboard, UserProfile } from './components/pages';

StatusBar.setBarStyle('light-content');
StatusBar.setBackgroundColor(colors.blue);

// const Stack = {
//   Dashboard: {
//     screen: Dashboard,
//   },
//   AddPerson: {
//     screen: AddPerson,
//   },
//   EditPerson: {
//     screen: EditPerson,
//   },
//   PersonList: {
//     screen: PersonList,
//   },
//   PersonDetail: {
//     screen: PersonDetail,
//   }
// };

const Drawer = {
  DashboardStack: {
    name: 'DashboardStack',
    screen: createStackNavigator(
      {
        Dashboard: {
          screen: Dashboard,
        },
      },
      getStackOptions('Dashboard')
    ),
  },
  UserProfileStack: {
    name: 'UserProfileStack',
    screen: createStackNavigator(
      {
        UserProfile: {
          screen: UserProfile,
        },
      },
      getStackOptions('UserProfile')
    ),
  },
  // PersonListViewStack: {
  // 	name: 'PersonListViewStack',
  // 	screen: StackNavigator(Stack, getStackOptions('PersonList'))
  // },
  // MediaListViewStack: {
  // 	name: 'MediaListViewStack',
  // 	screen: StackNavigator(Stack, getStackOptions('MediaList'))
  // },
  // ComponentListViewStack: {
  // 	name: 'ComponentListViewStack',
  // 	screen: StackNavigator(Stack, getStackOptions('ComponentList'))
  // },
  // LookupMediaViewStack: {
  //   name: 'LookupMediaViewStack',
  //   screen: StackNavigator(Stack, getStackOptions('LookupMedia'))
  // },
  // WorkspaceListViewStack: {
  // 	name: 'WorkspaceListViewStack',
  // 	screen: StackNavigator(Stack, getStackOptions('WorkspaceList'))
  // }
};

const RootNavigator = createSwitchNavigator(
  {
    // Login: { name: 'Login', screen: Login },
    OwnerApp: {
      name: 'OwnerApp',
      screen: createDrawerNavigator(Drawer, {
        drawerPosition: 'left',
        contentComponent: AppDrawer,
      }),
    },
  },
  {
    headerMode: 'none',
    // mode: 'modal',
    navigationOptions: {
      gesturesEnabled: false,
    },
  }
);

export default RootNavigator;
