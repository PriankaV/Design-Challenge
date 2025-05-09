import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LaunchScreen from "./src/screens/LaunchScreen";
import RecipeScreen from "./src/screens/RecipeScreen";
import EducationHubScreen from "./src/screens/EducationHubScreen";
import CommunityScreen from "./src/screens/CommunityScreen";
import SettingsScreen from "./src/screens/SettingsScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LaunchScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Recipe" component={RecipeScreen} />
        <Stack.Screen name="Education Hub" component={EducationHubScreen} />
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="Settings" component={SettingsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
