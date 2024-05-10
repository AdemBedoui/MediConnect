import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "./screens/Home";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { AuthProvider } from "./contexts/AuthContext"; // Assuming you have an AuthContext

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Register" component={Register} />
          {/* Add more navigation routes based on your patientRoutes */}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}
