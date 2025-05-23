import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LaunchScreen from "./src/screens/LaunchScreen";
import RecipeScreen from "./src/screens/RecipeScreen";
import EducationHubScreen from "./src/screens/EducationHubScreen";
import FindHelpScreen from "./src/screens/FindHelpScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={LaunchScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Recipe" component={RecipeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Education Hub" component={EducationHubScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Find Help" component={FindHelpScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}