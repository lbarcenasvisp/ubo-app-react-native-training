import {
    createStackNavigator,
  } from 'react-navigation';
  import LogIn from '../screens/LogIn';
  import LoggedInTabNavigator from './LoggedInTabNavigator';
  //import CustomerList from '../screens/CustomerList';
  
  const AppRouteConfigs = createStackNavigator({
    LoggedIn: {
      screen: LoggedInTabNavigator,
      navigationOptions: {
        header: null,
        gesturesEnabled: false,
      },
    },
    LogIn: { screen: LogIn }
  });
  
  export default AppRouteConfigs;