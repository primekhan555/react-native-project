import OptionsScreen from './Screens/OptionsScreen';
import SignIn from './Screens/SignIn';
import SignUp from './Screens/SignUp';
import Information1 from './Screens/Information1';
// import Testing from './Screens/Testing';
import GetAppointments from './Screens/GetAppoinments';
import PersonalInfo from './Screens/PersonalInfo';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import GeneratingQRCode from './Screens/GeneratingQRCode';
import SplashScreen from './Screens/SplashScreen';
import NewAppointment from './Screens/NewAppointment';

//
const TabScreen = createMaterialTopTabNavigator(
  {
    Record: { screen: GetAppointments },
    QR_Code: { screen: GeneratingQRCode },
    Settings: { screen: PersonalInfo },
  },
  {
    tabBarPosition: 'bottom',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#F8F8F8',
      style: {
        backgroundColor: '#ff6666',
      },
      labelStyle: {
        textAlign: 'center',
      },
      indicatorStyle: {
        borderBottomColor: 'black',
        borderBottomWidth: 5,
      },
    },
  });

const AppNavigator = createStackNavigator({
  Splash: {
    screen: SplashScreen,
    navigationOptions: {
      header: null,
    }
  },
  Options: {
    screen: OptionsScreen,
    navigationOptions: {
      header: null
      // headerTitle:'hello world'
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
  // TabScreen: {
  //   screen: TabScreen,
  //   navigationOptions: {
  //     headerStyle: {
  //       backgroundColor: '#ff6666',
  //     },
  //     headerTintColor: '#FFFFFF',
  //     // title: 'TabExample',
  //   },
  // },
  GetAppointments: {
    screen: GetAppointments,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6666'
      },
      headerTintColor: '#ffffff'
    }
  },
  GeneratingQRCode: {
    screen: GeneratingQRCode,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6666'
      },
      headerTintColor: '#ffffff'
    }
  },
  PersonalInfo: {
    screen: PersonalInfo,
    navigationOptions: {
      headerStyle: {
        backgroundColor: '#ff6666'
      },
      headerTintColor: '#ffffff'
    }
  },
  NewAppointment: {
    screen: NewAppointment,
    navigationOptions : {
      header:null
    }
  }
});

export default createAppContainer(AppNavigator);