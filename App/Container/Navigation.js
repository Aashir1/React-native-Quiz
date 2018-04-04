import React from 'react';
import { View, Text } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import Signup from '../Component/signup';
import Login from '../Component/login';
import LoginDemo from '../Component/login';
import SignupDemo from '../Component/signup';
import { Tab1, Tab2 } from '../Component/home'
import Home from '../Component/home';
import { Provider } from 'react-redux';
import store from '../store/index';
// import SplashScreen from '../Component/splashScreen';
// import Menu from '../Component/menu';
import {Menu, SplashScreen, Questions, Topics, Result} from '../Component'

const AuthStack = StackNavigator(
  {
    SignUp: {
      screen: SignupDemo,
    },
    LogIn: {
      screen: LoginDemo,
    },
    Home:{
      screen: Home
    }
  },
  {
    initialRouteName: 'LogIn',
  }
);

const AppOpening = StackNavigator({
  Open : {
    screen: SplashScreen
  },
  Menu:{
    screen: Menu
  },
  Question:{
    screen: Questions
  },
  Topic:{
    screen: Topics
  },
  Result:{
    screen: Result
  }
})

export default class App extends React.Component {
  render() {
    try{
      return (
        <Provider store={store}>
          {/* <AuthStack />  */}
          <AppOpening />
        </Provider>
    );
    } catch(error){
      alert(error);
    }
  }
}


const prevGetStateForActionHomeStack = AppOpening.router.getStateForAction;
AppOpening.router.getStateForAction = (action, state) => {
  if (state && action.type === 'ReplaceCurrentScreen') {
    const routes = state.routes.slice(0, state.routes.length - 1);
    routes.push(action);
    return {
      ...state,
      routes,
      index: routes.length - 1,
    };
  }
  return prevGetStateForActionHomeStack(action, state);
};

// export default class App extends React.Component {
//   render() {
//     return <AuthStack />;
//   }
// }
