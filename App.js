import OptionsScreen from './Screens/OptionsScreen';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Information1 from './Screens/Information1';
// import Testing from './Screens/Testing';
import GetAppointments from './Screens/GetAppoinments';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const AppNavigator = createStackNavigator({
  Options: {
    screen: OptionsScreen,
    navigationOptions: {
      header: null
      // headerTitle:'hello'
    }
  },
  Signin: {
    screen: SignIn,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6666',
      },
      headerTintColor: '#ffffff',
    }
  },
  Signup: {
    screen: SignUp,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6666'
      },
      headerTintColor: '#ffffff'
    }
  },
  Information1: {
    screen: Information1,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6666'
      },
      headerTintColor: '#ffffff'
    }
  },
  GetAppointments: {
    screen: GetAppointments,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6666'
      },
      headerTintColor: '#ffffff'
    }
  }
});

export default createAppContainer(AppNavigator);