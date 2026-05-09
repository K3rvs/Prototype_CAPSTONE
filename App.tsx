import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";
import { cssInterop } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";

import LoginVerifyRoleSelection from "./app/index";
import LoginChoice from "./app/LoginChoice";
import LoginAuth from "./app/LoginAuth";
import LoginVerifySchool from "./app/LoginVerifySchool";
import LoginVerifyForm from "./app/LoginVerifyForm";
import LoginVerifyPending from "./app/LoginVerifyPending";
import LoginVerifySuccess from "./app/LoginVerifySuccess";
import AdminDashboard from "./app/admin";
import TeacherDashboard from "./app/teacher";
import StudentDashboard from "./app/student";

cssInterop(MaterialCommunityIcons, {
  className: {
    target: "style",
    nativeStyleToProp: {
      color: true,
    },
  },
});

cssInterop(SafeAreaView, { className: "style" });
cssInterop(Animated.View, { className: "style" });
cssInterop(Animated.Text, { className: "style" });
cssInterop(Animated.ScrollView, { className: "style" });

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="index">
          <Stack.Screen name="index" component={LoginVerifyRoleSelection} />
          <Stack.Screen name="LoginChoice" component={LoginChoice} />
          <Stack.Screen name="LoginAuth" component={LoginAuth} />
          <Stack.Screen name="LoginVerifySchool" component={LoginVerifySchool} />
          <Stack.Screen name="LoginVerifyForm" component={LoginVerifyForm} />
          <Stack.Screen name="LoginVerifyPending" component={LoginVerifyPending} />
          <Stack.Screen name="LoginVerifySuccess" component={LoginVerifySuccess} />
          <Stack.Screen name="admin" component={AdminDashboard} />
          <Stack.Screen name="teacher" component={TeacherDashboard} />
          <Stack.Screen name="student" component={StudentDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </>
  );
}