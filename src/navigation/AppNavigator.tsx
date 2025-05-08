import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import RecipeScreen from '../screens/RecipeScreen';
import EducationHubScreen from '../screens/EducationHubScreen';
import CommunityScreen from '../screens/CommunityScreen';
import SettingsScreen from '../screens/SettingsScreen';
import LaunchPage from '../screens/LaunchScreen';

const Tab = createBottomTabNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: { backgroundColor: '#fff' },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: '#8e8e93',
        }}
      >
        <Tab.Screen name="Home" component={LaunchPage} />
        <Tab.Screen name="Recipe" component={RecipeScreen} />
        <Tab.Screen name="Education Hub" component={EducationHubScreen} />
        <Tab.Screen name="Community" component={CommunityScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;