import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import "./global.css";
import { cssInterop } from "nativewind";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import Animated from "react-native-reanimated";

import LoginScreen from "./app/(tabs)/index";
import RegisterRole from "./app/(tabs)/RegisterRole";
import RegisterSchool from "./app/(tabs)/RegisterSchool";
import RegisterDomain from "./app/(tabs)/RegisterDomain";
import RegisterForm from "./app/(tabs)/RegisterForm";
import RegisterSuccess from "./app/(tabs)/RegisterSuccess";
import AdminDashboard from "./app/(tabs)/admin";
import TeacherDashboard from "./app/(tabs)/teacher";
import StudentDashboard from "./app/(tabs)/student";
import { AuthProvider } from "./AuthContext";

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
cssInterop(Animated.ScrollView, {
  className: "style",
  contentContainerClassName: "contentContainerStyle",
});

const Stack = createNativeStackNavigator();

/**
 * Main Application Entry Point.
 * 
 * Sets up global routing, authentication context, and status bar behavior.
 */
export default function App() {
  return (
    // Wrap the app in AuthProvider to make auth state available to all screens
    <AuthProvider>
      <NavigationContainer>
        {/* Main routing stack. Headers are hidden as screens manage their own top bars. */}
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName="index"
        >
          {/* Authentication & Registration Flow */}
          <Stack.Screen name="index" component={LoginScreen} />
          <Stack.Screen name="RegisterRole" component={RegisterRole} />
          <Stack.Screen name="RegisterSchool" component={RegisterSchool} />
          <Stack.Screen name="RegisterDomain" component={RegisterDomain} />
          <Stack.Screen name="RegisterForm" component={RegisterForm} />
          <Stack.Screen name="RegisterSuccess" component={RegisterSuccess} />
          
          {/* Main Dashboard Screens based on User Role */}
          <Stack.Screen name="admin" component={AdminDashboard} />
          <Stack.Screen name="teacher" component={TeacherDashboard} />
          <Stack.Screen name="student" component={StudentDashboard} />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </AuthProvider>
  );
}
