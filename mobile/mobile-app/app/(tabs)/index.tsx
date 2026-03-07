import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../Register";
import Login from "../login";
import ForgetPassword from "../ForgetPassward"; // لو اسم الملف صحيح

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
    </Stack.Navigator>
  );
}