import React, { Component } from "react";
import { StyleSheet, Text, View } from "react-native";
import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { AppTabNavigator } from "./components/AppTabNavigator";
import LogInScreen from "./screens/LoginScreen";
import SearchStoreScreen from "./screens/SearchStoreScreen";
import WelcomeScreen from "./screens/WelcomeScreen";

export default class App extends Component {
  render() {
    return <AppContainer />;
  }
}

const SwitchNavigator = createSwitchNavigator({
  WelcomeScreen: { screen: WelcomeScreen },
  LogInScreen: { screen: LogInScreen },
  SearchStoreScreen: { screen: SearchStoreScreen },
  AppTabNavigator:{screen: AppTabNavigator},
});

const AppContainer = createAppContainer(SwitchNavigator);
